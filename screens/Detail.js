import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import Video from '../components/Video';
import PlayButton from '../components/PlayButton';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;
const Detail = ({route, navigation}) => {
  const [movieDetail, setDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const movieId = route.params.movieId;
  useEffect(() => {
    getMovie(movieId)
      .then(movieData => {
        setDetail(movieData);
        setLoaded(true);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movieId]);
  const showVideo = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton
                  handlePress={() => {
                    setModalVisible(true);
                  }}
                />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map((genre, index) => {
                    return (
                      <Text style={styles.genre} key={index}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}

              <View style={styles.rateContainer}>
                <StarRating
                  disabled={true}
                  fullStarColor={'gold'}
                  starSize={30}
                  maxStars={5}
                  rating={movieDetail.vote_average / 2}
                />
                <Text style={styles.rateText}>{movieDetail.vote_average}</Text>
              </View>

              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <Video onClose={() => showVideo()} />
            </View>
          </Modal>
        </View>
      )}

      {!loaded && <ActivityIndicator size="large" color="#0000ff" />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  image: {
    height: height / 1.5,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -35,
    right: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Detail;
