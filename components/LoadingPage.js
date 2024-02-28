import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function LoadingPage(){

    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ActivityIndicator size="large" />
            </View>
        </SafeAreaView>
    )


}