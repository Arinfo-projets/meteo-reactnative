import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import LoadingPage from './components/LoadingPage';
import axios from 'axios';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { roundNumber } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from './utils/palette';
import CardComponent from './components/CardComponent';
import MapView from 'react-native-maps';

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
            <ScrollView>
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
                    <Text style={{color: 'white'}}>ressentie {roundNumber(city.main.feels_like)}° </Text>
                    </View>
                  </View>

                  <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'space-between'}}>
                         <CardComponent width="48%" >
                              <Icon name="tint" color="white" size={30} />
                              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>Humidité</Text>
                              <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>{city.main.humidity} %</Text>
                         </CardComponent>
                         <CardComponent width="48%" >
                              <Icon name="angle-double-down" color="white" size={30} />
                              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white', textAlign: 'center'}}>Pression athmosphérique</Text>
                              <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>{city.main.pressure} hPa</Text>
                         </CardComponent>
                  </View>

                  <View style={{height: 200, marginTop: 40, border: '1px solid black'}}>
                  <MapView
                      style={{height: '100%'}}
                      initialRegion={{
                        latitude: city.coord.lat,
                        longitude: city.coord.lon,
                        latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
                      }}
                    />
                  </View>

                </View>

              ) : (
                <Text style={styles.noCityText}>Aucune ville trouvé</Text>
                )}
            </>
          )}
        </View>
        <StatusBar style="auto" />
          </ScrollView>
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
