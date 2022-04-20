import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

const imageUrl = "https://live.staticflickr.com"

export default function DetailsScreen(props) {
  const data = props.route.params.item
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: `${imageUrl}/${data.server}/${data.id}_${data.secret}.jpg` }}
        style={styles.imageStyle}>

        <TouchableOpacity style={styles.backButton} onPress={() => { props.navigation.goBack() }}>
          <Text style={{ fontWeight: 'bold' , color : '#444'}}>{"< Back"}</Text>
        </TouchableOpacity>

      </FastImage>
      <View style={{ padding: 12 }}>

        <Text style={styles.titlePlaceHolder}>Title</Text>
        <Text style={[styles.textStyle, { borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 12 }]}>{data.title}</Text>
        <Text style={styles.titlePlaceHolder}>Tags</Text>
        <Text style={styles.textStyle}>{data?.tags ?? "NA"}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageStyle: { width: '100%', borderRadius: 8, aspectRatio: 1 },
  textStyle: { fontSize: 16, fontWeight: '600', marginVertical: 6, color : '#444' },
  backButton: { position: 'absolute', top: 12, left: 12, backgroundColor: '#eaeaea', paddingHorizontal: 12, borderRadius: 8, elevation: 4, paddingVertical: 6 },
  titlePlaceHolder : {  color : '#444'}
})