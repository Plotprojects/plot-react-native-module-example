/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, 
  Button, 
  Platform,
  NativeModules, 
  PermissionsAndroid
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Plot from 'plotprojects-react-native-module';

const initializePlot = async () => {

    Plot.initialize();

    Plot.setAdvertisingId('jdlsfksdkjf', true);

    Plot.sendAttributionEvent("read_flyer", "discounts_week_12");
    Plot.setStringSegmentationProperty("gender", "man");

    console.debug('Registering notificaiton filter');
    
    Plot.registerNotificationFilter((batchId, notifications) => {
        console.debug('Received notifications in the filter with batchId: ' + batchId);
        notifications.forEach((n) => {
          n['message'] = n['message'] + ' after filtering';
        });
		console.debug(JSON.stringify(notifications));
        Plot.filterNotifications(batchId, JSON.stringify(notifications));
    });
	
	console.debug('Registering geotrigger handler');
	
	Plot.registerGeotriggerHandler((batchId, geotriggers) => {
		console.debug('Received geotriggers in the handler with batchId: ' + batchId);
		console.debug(JSON.stringify(geotriggers));
		Plot.handleGeotriggers(batchId, JSON.stringify(geotriggers));
	});
	
	console.debug('Registering notificaiton open handler');
	
	Plot.registerNotificationOpenHandler((openedNotification) => {
		console.debug('Received opened notifications in the handler');
		console.debug(JSON.stringify(openedNotification));
	});
}

const requestLocationPermission = async () => {
    try {
      if(Platform.OS === "ios") {
        initializePlot();
      } else {
        const granted = await PermissionsAndroid.requestMultiple(
          [
			  'android.permission.POST_NOTIFICATIONS',
			  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
			  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  			  PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
			  PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION]);
        if (granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
              || granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
			console.debug("Foreground location permission granted!");
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
			if (granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED) {
				console.debug("Background location permission granted!");
			} else {
				console.debug("Background location permission denied!");
			}
          initializePlot();
        } else {
          console.debug("Location permission denied!. Not initializing PlotProjects SDK.");
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

requestLocationPermission();

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
          <View style={styles.sectionContainer}>
          <Button
              title="Email debug log"
              onPress={() => Plot.mailDebugLog()}
            />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
