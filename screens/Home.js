import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
} from './../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [movieImages, setMovieImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies,
      getPopularMovies,
      getPopularTv,
      getFamilyMovies,
    ]);
  };
  useEffect(() => {
    // getData()
    //   .then(
    //     ([
    //       upcomingMoviesData,
    //       popularMoviesData,
    //       popularTvData,
    //       familyMoviesData,
    //     ]) => {
    //       const moviesImagesArray = [];
    //       upcomingMoviesData.forEach(movie => {
    //         moviesImagesArray.push(
    //           'https://image.tmdb.org/t/p/w500' + movie.poster_path,
    //         );
    //       });
    //       setMovieImages(moviesImagesArray);
    //       setPopularMovies(popularMoviesData);
    //       setPopularTv(popularTvData);
    //       setFamilyMovies(familyMoviesData);
    //       console.log(popularTvData);
    //     },
    //   )
    //   .catch(() => {
    //     setError(true);
    //   })
    //   .finally(() => {
    //     setLoaded(true);
    //   });
    getUpcomingMovies()
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMovieImages(moviesImagesArray);
      })
      .catch(err => {
        err = true;
        setError(err);
      });
    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        err = true;
        setError(err);
      });
    getPopularTv()
      .then(movies => {
        setPopularTv(movies);
      })
      .catch(err => {
        err = true;
        setError(err);
      });
    getFamilyMovies()
      .then(movies => {
        setFamilyMovies(movies);
      })
      .catch(err => {
        err = true;
        setError(err);
      });
    setLoaded(true);
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimensions.height / 1.5}
                autoplay
                circleLoop={true}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Error />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
