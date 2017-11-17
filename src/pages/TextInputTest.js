import  {
    React,
    Component
} from 'react'
import { 
    HeaderBackButton,
    NavigationActions } from 'react-navigation';
import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert 
} from 'react-native'


import CommonTextInput from '../component/CommonTextInput'
export default class TextInputTest extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '多个TextInput',
        }
    };
    constructor(props) {
        super(props)
        this.state = {
            AA: '',
            BB: '',
            CC: '',
            DD: '',
            EE: '',
            FF: '',

            data: [
                { titleName: '111' },
                { titleName: '222' },
                { titleName: '333' },
                { titleName: '444' },
                { titleName: '555' },
                { titleName: '666' },
                { titleName: '777' },
                { titleName: '888' },
                { titleName: '999' },
            ]
        }
        this.onChangeText = this.onChangeText.bind(this)
        this.submit = this.submit.bind(this)
    }

    onChangeText(text, titleName) {
        switch (titleName) {
            case 'AA':
                this.setState({
                    AA: text
                })
            case 'BB':
                this.setState({
                    BB: text
                })
            case 'CC':
                this.setState({
                    CC: text
                })
            case 'DD':
                this.setState({
                    DD: text
                })
            case 'EE':
                this.setState({
                    EE: text
                })
            case 'FF':
                this.setState({
                    FF: text
                })
            default:
        }
    }

    submit() {
        console.log('AA', this.state.AA)
        console.log('BB', this.state.BB)
        console.log('CC', this.state.CC)
        console.log('DD', this.state.DD)
        console.log('EE', this.state.EE)
        console.log('FF', this.state.FF)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <CommonTextInput titleName='AA' onChangeText={this.onChangeText} />
                        <CommonTextInput titleName='BB' onChangeText={this.onChangeText} />
                        <CommonTextInput titleName='CC' onChangeText={this.onChangeText} />
                        <CommonTextInput titleName='DD' onChangeText={this.onChangeText} />
                        <CommonTextInput titleName='EE' onChangeText={this.onChangeText} />
                        <CommonTextInput titleName='FF' onChangeText={this.onChangeText} />
                    </ScrollView>
                </View>

                <TouchableOpacity
                    onPress={this.submit}
                    style={{ padding: 10, backgroundColor: '#393A3F', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

