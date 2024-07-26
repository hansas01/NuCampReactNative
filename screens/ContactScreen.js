import { ScrollView, Text} from 'react-native';
import { Card } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';

const ContactScreen = () => {
    return (
        <ScrollView> 
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
            >
                <Card wrapperStyle={{margin: 20}}>
                    <Card.Title>
                        Contact Information
                    </Card.Title>
                    <Card.Divider />
                    <Text>
                        <Text>1 Nucamp Way{"\n"}</Text>
                        <Text>Seattle, WA 98001{"\n"}</Text>
                        <Text>U.S.A.</Text>
                    </Text>
                    <Text>
                        <Text>{"\n"}Phone: 1-206-555-1234{"\n"}</Text>
                        <Text>Email: campsites@nucamp.co</Text>
                    </Text>
                </Card>
            </Animatable.View>
        </ScrollView>
    );
};

export default ContactScreen;