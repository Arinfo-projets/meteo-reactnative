import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import LoadingPage from './components/LoadingPage';
import axios from 'axios';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { roundNumber } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from './utils/palette';

export default function App() {
  const [isBusy, setIsBusy] = React.useState(false);
  const [city, setCity] = React.useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cityname: '',
    },
  });

  const handleSearchWeather = async (data) => {
    try {
      setIsBusy(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data.cityname}&units=metric&lang=fr&appid=4c4db4afe49b1cd4cf592fdc0d0bfe79`
      );
      setCity(response.data); // Access the response data
    } catch (error) {
      setCity(null);
      console.error(error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Controller
          control={control}
          name="cityname"
          render={({ field : { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder="Enter City Name"
              onSubmitEditing={handleSubmit(handleSearchWeather)}
            />
          )}
        />
        <View style={styles.weatherContainer}>
          {isBusy ? (
            <LoadingPage />
          ) : (
            <>
              {city ? (
                <View>

                <View style={styles.weatherInfo}>
                        <View>
                          <Text style={styles.temperature}>{roundNumber(city.main.temp)}°</Text>
                          <Text style={styles.weatherDescription}>{city.weather[0].description}</Text>
                          <View>
                          </View>
                        </View>
                        <View style={styles.weatherInfoIcon}>
                        <Image source={{
                          uri: `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
                        }} style={{width: 200, height: 200}} />
                        </View>
                </View>
                  <View style={{marginTop: 30}}>
                    <View style={{flexDirection: 'row', gap: 10 }}>
                      <Text style={styles.cityName}>{city.name}, {city.sys.country}</Text>
                      <Icon name="map-marker" size={30} color="white" />
                    </View>
                    <View style={styles.temperatureResume}>
                    <Text style={{color: 'white'}}>{roundNumber(city.main.temp_max)}° / {roundNumber(city.main.temp_min)}°  </Text>
                    <Text style={{color: 'white'}}>ressentie {roundNumber(city.main.temp_max)}° </Text>

                    </View>
                  </View>

                </View>


                  // <Text style={styles.cityName}>{city.name}, {city.sys.country}</Text>
                  // <Text style={styles.temperature}>{city.main.temp}°C</Text>

                  // <View>
                  //
                  // <Text style={styles.weatherDescription}>{city.weather[0].description}</Text>
                  // </View>

                // </View>
              ) : (
                <Text style={styles.noCityText}>Aucune ville trouvé</Text>
              )}
            </>
          )}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.$main,
    padding: 20
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  weatherContainer: {
    marginTop: 0
  },
  weatherInfoText:{

  },
  weatherInfoIcon:{

  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  cityName: {
    fontSize: 24,
    color: 'white',
  },
  temperature: {
    fontSize: 72,
    color: 'white',
  },
  weatherDescription: {
    fontSize: 18,
    color: 'white',
  },
  noCityText: {
    fontSize: 16,
    color: 'white',
  },
  temperatureResume:{
    flexDirection: 'row',
    marginTop: 5
  }
});
