import { ScrollView, Text} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


const ContactScreen = () => {
    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['campsites@nucamp.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        });
    };

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
                    <Button
                        title='Send Email'
                        buttonStyle={{ backgroundColor: '#5637DD', margin: 40 }}
                        icon={
                            <Icon 
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        onPress={() => sendMail()}
                    />
                </Card>
            </Animatable.View>
        </ScrollView>
    );
};

export default ContactScreen;