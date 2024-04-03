import numpy as np


class Node:
    def __init__(
        self,
        feature_index=None,
        threshold=None,
        left=None,
        right=None,
        value=None,
    ):
        self.feature_index = feature_index
        self.threshold = threshold
        self.left = left
        self.right = right
        self.value = value


class DecisionTree:
    def __init__(self, max_depth=None):
        self.max_depth = max_depth

    def _calculate_gini(self, y):
        classes = np.unique(y)
        gini = 0
        for cls in classes:
            p = np.sum(y == cls) / len(y)
            gini += p * (1 - p)
        return gini

    def _split_dataset(self, X, y, feature_index, threshold):
        left_mask = X[:, feature_index] <= threshold
        right_mask = ~left_mask
        return X[left_mask], X[right_mask], y[left_mask], y[right_mask]

    def _find_best_split(self, X, y):
        m, n = X.shape
        best_gini = float("inf")
        best_feature_index = None
        best_threshold = None

        for feature_index in range(n):
            thresholds = np.unique(X[:, feature_index])
            for threshold in thresholds:
                X_left, X_right, y_left, y_right = self._split_dataset(
                    X, y, feature_index, threshold
                )
                gini_left = self._calculate_gini(y_left)
                gini_right = self._calculate_gini(y_right)
                gini_left = len(y_left) / m * gini_left
                gini_right = len(y_right) / m * gini_right
                gini = gini_left + gini_right
                if gini < best_gini:
                    best_gini = gini
                    best_feature_index = feature_index
                    best_threshold = threshold
        return best_feature_index, best_threshold

    def _build_tree(self, X, y, depth=0):
        num_samples_per_class = [np.sum(y == 1) for i in range(np.max(y) + 1)]
        predicted_class = np.argmax(num_samples_per_class)

        if depth == self.max_depth or len(np.unique(y)) == 1:
            return Node(value=predicted_class)

        best_feature_index, best_threshold = self._find_best_split(X, y)

        if best_feature_index is None:
            return Node(value=predicted_class)

        X_left, X_right, y_left, y_right = self._split_dataset(
            X, y, best_feature_index, best_threshold
        )

        left_subtree = self._build_tree(X_left, y_left, depth + 1)
        right_subtree = self._build_tree(X_right, y_right, depth + 1)

        return Node(
            feature_index=best_feature_index,
            threshold=best_threshold,
            left=left_subtree,
            right=right_subtree,
        )

    def fit(self, X, y):
        self.tree = self._build_tree(X, y)

    def _predict_single(self, x, node):
        if node.value is not None:
            return node.value

        if x[node.feature_index] <= node.threshold:
            return self._predict_single(x, node.left)
        else:
            return self._predict_single(x, node.right)

    def predict(self, X):
        return [self._predict_single(x, self.tree) for x in X]


class RandomForest:
    def __init__(self, n_estimators=100, max_depth=None):
        self.n_estimators = n_estimators
        self.max_depth = max_depth

    def _bootstrap_sampling(self, X, y):
        indices = np.random.choice(len(X), size=len(X), replace=True)
        return X[indices], y[indices]

    def fit(self, X, y):
        self.trees = []
        for _ in range(self.n_estimators):
            tree = DecisionTree(max_depth=self.max_depth)
            X_sample, y_sample = self._bootstrap_sampling(X, y)
            tree.fit(X_sample, y_sample)
            self.trees.append(tree)

    def predict(self, X):
        predictions = np.array([tree.predict(X) for tree in self.trees])
        return np.mean(predictions, axis=0).astype(int)
