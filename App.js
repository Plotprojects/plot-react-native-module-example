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

const Plot = NativeModules.PlotProjectsReactModule;

const initializePlot = async () => {

    Plot.initialize();

    Plot.setAdvertisingId('jdlsfksdkjf', true);

    Plot.sendAttributionEvent("read_flyer", "discounts_week_12");
    Plot.setStringSegmentationProperty("gender", "man");

    console.debug('registering notificaiton filter');
    
    Plot.registerNotificationFilter((batchId, notifications) => {
        console.debug('received notifications in the filter with batchId: ' + batchId);
        notifications.forEach((n) => {
          n['message'] = n['message'] + ' after filtering';
        });
        // notifications[0]['message'] = 'NLD after filtering';
		console.log(JSON.stringify(notifications));
        Plot.filterNotifications(batchId, JSON.stringify(notifications));
    });
	
	Plot.registerGeotriggerHandler((batchId, geotriggers) => {
		console.debug('received geotriggers in the handler with batchId: ' + batchId);
		console.log(JSON.stringify(geotriggers));
		Plot.handleGeotriggers(batchId, JSON.stringify(geotriggers));
	});
	
	Plot.registerNotificationOpenHandler((openedNotification) => {
		console.debug('received opened notifications in the handler');
		console.log(JSON.stringify(openedNotification));
	});
}

const requestLocationPermission = async () => {
    try {
		if(Platform.OS === "ios") {
			initializePlot();
		} else {
	        const granted = await PermissionsAndroid.requestMultiple(
	          [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
	              PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
	              PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION]);
	        if (granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
	              || granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
	              || granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
	        ) {
	          console.log("Location permission granted!");
	          initializePlot();
	        } else {
	          console.log("Location permission denied");
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
