import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Card from '../components/Card'

const perPage = 30

function apiUrl(text = "", page = 1) {
    let baseUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c984a71031866a199f66335512b270da&text=${text}&page=${page}&format=json&nojsoncallback=1&per_page=${perPage}`
    return baseUrl
}


export default function Home(porps) {

    const [searchedText, setSearchedText] = React.useState('')
    const [page, setPage] = React.useState(1)

    const [photos, setPhotos] = React.useState([])
    const [error, setError] = React.useState(false)
    
    const [apiEndReached, setapiEndReached] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    function handleOnCardPress(item) {
        porps.navigation.navigate('Details', { item })
    }

    function fetchImage(pageArg, fromEndScroll = false) {
        if (searchedText.length == 0) {
            setPhotos([])
            return
        }
        let requestOptions = {
            method: 'GET',
        };
        fetch(apiUrl(searchedText, pageArg ?? page), requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result.photos)
                if (fromEndScroll) {
                    setPhotos((photos) => [...photos, ...result?.photos?.photo])
                    if(result?.photos?.photo?.length < perPage) {
                        setapiEndReached(true)
                    }
                } else {
                    setPhotos(result?.photos?.photo)
                }

                setLoading(false)
            })
            .catch(error => {
                setError(true)
                console.log('error', error)
            });

        
    }

    useEffect(() => {
        if (searchedText.length > 0) {
            let page = 1
            setPage(1)
            setapiEndReached(false)
            fetchImage(page)
        } else {
            setPhotos([])
        }
    }, [searchedText])

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInputStyle}
                placeholder="Search Image"
                onChangeText={(text) => { setSearchedText(text) }}
            />
            {
                error ? <View style={styles.errorContainer}>
                    <Text>OOPS..</Text>
                    <Text>Some error occured</Text>
                </View> :

                    <FlatList
                        data={photos}
                        renderItem={({ item }) => <Card data={item} onCardPress={() => { handleOnCardPress(item) }} />}
                        keyExtractor={(item, index) => item?.id + Math.random()*index}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ width: '100%', paddingHorizontal: 12 }}
                        initialNumToRender={10}
                        maxToRenderPerBatch={8}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => loading ? <ActivityIndicator size={32} color="#444" style={{ marginVertical: 12 }} /> : null}
                        onEndReached={() => {
                            if(!apiEndReached){
                                setLoading(true)
                            }
                            setPage(page + 1)
                            fetchImage(page + 1, true)
                        }}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    textInputStyle: { width: '95%', height: 50, backgroundColor: '#999', paddingHorizontal: 12, marginVertical: 12, borderRadius: 8, marginHorizontal: 12, elevation: 4 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})