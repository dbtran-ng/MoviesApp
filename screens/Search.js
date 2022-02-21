import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Card from './../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Error from '../components/Error';
const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResult, setSearchResult] = useState();
  const [error, setError] = useState();
  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'tv'), searchMovieTv(query, 'movie')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResult(data);
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <React.Fragment>
      <SafeAreaView style={{backgroundColor: 'transparent'}}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Search Movie or TV Show"
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItem}>
          {searchResult && searchResult.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResult}
              renderItem={({item}) => {
                <Card
                  navigation={navigation}
                  item={item}
                  keyExtractor={item => item.id}
                />;
              }}
            />
          )}

          {searchResult && searchResult.length === 0 && (
            <View style={styles.noResults}>
              <Text>No results found</Text>
            </View>
          )}

          {!searchResult && (
            <View style={styles.empty}>
              <Text>Type something...</Text>
            </View>
          )}

          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 10,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItem: {
    padding: 5,
  },
  noResults: {
    paddingTop: 20,
  },
});
export default Search;
