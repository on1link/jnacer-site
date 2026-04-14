Title: Building a Customer Churn Prediction Pipeline
Date: 2026-04-01
Tags: ml, python, lightgbm, eda
Status: draft
Summary: A walkthrough of building an end-to-end churn prediction pipeline with LightGBM on a 594K-row telecom dataset.

Predicting customer churn is one of those bread-and-butter data science problems that never gets old. The business value is immediate, the data is messy enough to be realistic, and the modeling choices matter.

## The Dataset

The dataset contains roughly 594,000 rows of telecom customer data — usage patterns, contract details, demographics, and a binary churn label. Not huge by modern standards, but large enough that feature engineering decisions have real impact on both performance and training time.

## Approach

The pipeline follows a structured methodology:

1. **Exploratory Data Analysis** — distribution checks, missing value patterns, correlation analysis
2. **Feature Engineering** — interaction features, ratio features, binning of continuous variables
3. **Modeling** — LightGBM with Bayesian hyperparameter tuning
4. **Evaluation** — precision-recall tradeoffs, calibration, feature importance analysis

The full code is available on [GitHub](https://github.com/on1link).
