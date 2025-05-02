import {View, Text, TextStyle, StyleSheet} from 'react-native'

type Props = {
    number: number;
    unit: string;
    textStyle?: TextStyle;
}

const TimeSegment = ({number, unit, textStyle}:Props) =>{
    return(
        <View style={Styles.segmentContainer}>
            <Text style={[Styles.number, textStyle]}>{number}</Text>
            <Text style={textStyle}>{unit}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    segmentContainer:{
        padding:12,
        margin:4,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
    },
    number:{
        fontSize:24,
        fontWeight:'600',
        fontVariant:['tabular-nums'],
    }
})

export default TimeSegment