import numpy as np
import unittest
from api.algorithm import RandomForest  # Assuming the file is named 'algorithm.py'

class TestRandomForest(unittest.TestCase):
    def setUp(self):
        # Generate some dummy data for testing
        np.random.seed(0)
        self.X_train = np.random.rand(100, 3)  # 100 samples, 3 features
        self.y_train = np.random.randint(2, size=100)  # Binary labels
        self.X_test = np.random.rand(10, 3)  # 10 samples for testing

    def test_fit_predict(self):
        # Instantiate and fit the random forest model
        rf = RandomForest(n_estimators=10, max_depth=3)
        rf.fit(self.X_train, self.y_train)

        # Ensure predictions are binary (0 or 1)
        predictions = rf.predict(self.X_test)
        self.assertTrue(all(prediction in [0, 1] for prediction in predictions))

    def test_bootstrap_sampling(self):
        # Check if bootstrap sampling returns samples of the correct shape
        rf = RandomForest(n_estimators=10, max_depth=3)
        X_sample, y_sample = rf._bootstrap_sampling(self.X_train, self.y_train)
        self.assertEqual(X_sample.shape[0], self.X_train.shape[0])
        self.assertEqual(y_sample.shape[0], self.y_train.shape[0])

if __name__ == "__main__":
    unittest.main()
