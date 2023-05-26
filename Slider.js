import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const CustomSlider = ({ rating, setRating }) => {
  const [sliderWidth, setSliderWidth] = useState(null);

  const handleLayout = (e) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  const calculateThumbPosition = () => {
    if (!sliderWidth) {
      return;
    }

    const thumbWidth = 38;
    const trackWidth = sliderWidth - thumbWidth;
    const thumbPosition = (trackWidth * ((rating - 1) / 9));

    return thumbPosition;
};

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.trackBackground} />
      {sliderWidth && (
      <View
        style={[
          styles.thumb,
          { left: calculateThumbPosition() },
          { pointerEvents: 'none' },
        ]}
      >
      <Text style={styles.thumbText}>{rating}</Text>
      </View>
      )}
      <Slider
        style={[styles.slider, { top: -17 }]}
        value={rating}
        onValueChange={setRating}
        minimumValue={1}
        maximumValue={10}
        step={1}
        thumbTintColor="transparent"
        thumbTouchSize={{ width: 50, height: 50 }}
        trackStyle={styles.track}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    width: '80%',
    marginTop: 84
  },
  trackBackground: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    borderRadius: 20,
  },
  slider: {
    height: 90,
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 10,
  },
  thumb: {
    position: 'absolute',
    top: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},

  thumbText: {
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default CustomSlider;
