import joblib
import warnings


class WqiPredict:
    predict_wqi = 0

    def __init__(self, conduct, ph):
        self.ph = ph
        self.conduct = conduct

    def wqi_predict(self):
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", category=UserWarning)
            model = joblib.load('waterQualitPredicModel_new_pkl.pkl')
            self.predict_wqi = model.predict([[self.ph, self.conduct]])
            return_values = {
                "wqi_index": self.predict_wqi,
                "wqi_range": self.find_range(self.predict_wqi)
            }
            return return_values

    @staticmethod
    def find_range(wqi):
        if wqi <= 50:
            return "Excellent"
        elif wqi <= 100:
            return "Normal"
        elif wqi <= 200:
            return "Poor"
        elif wqi <= 300:
            return "Very Poor"
        else:
            return "Unsuitable"

    def get_wqi_range(self):
        return self.find_range(self.predict_wqi)

    def get_wqi_index(self):
        return self.predict_wqi

    def set_conduct(self, conduct):
        self.conduct = conduct;

    def set_ph(self, ph):
        self.ph = ph
