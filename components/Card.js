import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {memo} from 'react'
import FastImage from 'react-native-fast-image'

const imageUrl = "https://live.staticflickr.com"

const Card = ({ data, onCardPress }) => {
    return (
        <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.7}
            onPress={onCardPress}>
            <FastImage source={{ uri: `${imageUrl}/${data.server}/${data.id}_${data.secret}_t.jpg` }} style={styles.imageStyle} />
            <Text style={styles.textStyle}>{data.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: { width: '100%', backgroundColor: '#eaeaea', marginVertical: 6, borderRadius: 8, flexDirection: 'row', padding: 12, elevation: 4 },
    imageStyle: { width: 80, height: 80, borderRadius: 8 },
    textStyle: { flex: 1, paddingLeft: 12 }
})

export default memo(Card)