import { StyleSheet, Text, View } from "react-native"
import { color } from "../utils/palette"



export default CardComponent = ({children, ...props}) => {

    return (
        <View style={styles.container} {...props} >
            {children}
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'auto',
        backgroundColor: color.$secondary,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10
    }
})