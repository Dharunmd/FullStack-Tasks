import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 1. Generate Dummy Data (Vibe Coding: Practicality)
def generate_sample_data(n_samples=100):
    np.random.seed(42)
    study_hours = np.random.rand(n_samples, 1) * 10
    attendance = np.random.rand(n_samples, 1) * 100
    # Score = 5 * study_hours + 0.3 * attendance + noise
    scores = (5 * study_hours + 0.3 * attendance + np.random.randn(n_samples, 1) * 5)
    
    df = pd.DataFrame({
        'Study_Hours': study_hours.flatten(),
        'Attendance': attendance.flatten(),
        'Score': scores.flatten()
    })
    return df

# 2. Main Logic
def train_and_evaluate():
    print("--- Student Performance Prediction Model ---")
    data = generate_sample_data(200)
    
    # Preprocessing
    X = data[['Study_Hours', 'Attendance']]
    y = data['Score']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Model Training
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Prediction
    y_pred = model.predict(X_test)
    
    # Evaluation Metrics
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Mean Squared Error: {mse:.2f}")
    print(f"R-squared Score: {r2:.2f}")
    print("\nModel Coefficients:")
    print(f"Study Hours Weight: {model.coef_[0]:.2f}")
    print(f"Attendance Weight: {model.coef_[1]:.2f}")

    # Sample Prediction
    sample_student = [[8, 90]] # 8 hours study, 90% attendance
    prediction = model.predict(sample_student)
    print(f"\nPredicted Score for 8 hours study and 90% attendance: {prediction[0]:.2f}")

if __name__ == "__main__":
    train_and_evaluate()
