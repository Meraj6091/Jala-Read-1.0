class WaterIoT:
    __ph = 6.5
    __conductivity = 650
    __turbidity = 303
    __temperature = 32

    def check_device_sensors(self):
        ph_sensor = True
        conductivity_sensor = True
        turbidity_sensor = True
        temperature_sensor = True

        sensor_stats = {
            "ph_sensor": ph_sensor,
            "conductivity_sensor": conductivity_sensor,
            "turbidity_sensor": turbidity_sensor,
            "temperature_": temperature_sensor
        }

        return sensor_stats;

    def get_ph_values(self):
        return self.__ph

    def get_conductivity_values(self):
        return self.__conductivity

    def get_turbidity_values(self):
        return self.__turbidity

    def get_temp_sensor(self):
        return self.__temperature

    def get_all_sensor(self):
        sensor_values = {
            "temp": self.__temperature,
            "conduct": self.__conductivity,
            "turbidity": self.__turbidity,
            "ph": self.__ph
        }
        return sensor_values;


