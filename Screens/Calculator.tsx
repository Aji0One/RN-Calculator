import React, { isValidElement, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Calculator = () => {
    const [expression, setExpression] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [memory, setMemory] = useState<any>(null);

    const handelButtonPress = (value: any) => {
        if (value === "=") {
            try {
                setResult(eval(expression).toString());
            } catch (error) {
                setResult('Error');
            }
        } else if (value === "C") {
            setExpression('');
            setResult('');
        } else {
            setExpression(prevExpression => prevExpression + value);
        }
    }

    const handleBackSpace = () => {
        const remainValue = expression.slice(0, expression.length - 1);
        setExpression(() => remainValue);
      };

    const renderButton: any = () => {
        const buttons = [
            ['C', '+/-', '%', '/'],
            [7, 8, 9, '*'],
            [4, 5, 6, '-'],
            [1, 2, 3, '+'],
            [0, '.', '='],
        ];

        return buttons.map((row: any, rowIndex: any) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((button: any, index: any) => (
                    <TouchableOpacity key={index} onPress={() => handelButtonPress(button)} style={button === "=" ?styles.equalTo :styles.button}>
                        <Text style={styles.buttonText}>{button}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ))
    }

    return (
        <View style={styles.container}>
            <View style={styles.display}>
                <Text style={styles.expression}>{expression}</Text>
                <Text style={styles.result}>{result.length!==0 ? result :memory}</Text>
      <View>
        <TouchableOpacity
          onPress={() => handleBackSpace()}
          disabled={expression ? false : true}
        >
          <Icon
            name='backspace'
            size={24}
            color={"#444"}
          />
        </TouchableOpacity>
      </View>
            </View>
            <View style={styles.buttons}>
                {renderButton()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff",
        justifyContent: "flex-end"
    },
    display: {
        padding: 20,
        alignItems: 'flex-end',
        
    },
    expression: {
        fontSize: 26,
        marginBottom: 10,
        color:"#000"
    },
    result: {
        fontSize: 32,
        marginBottom:10,
        color:"#000"
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor:"#999",
        paddingVertical:20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 50,
        width: 70,
        height: 70,
    },
    buttonText: {
        fontSize: 24,
        color:"#222"
    },
    equalTo:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        fontSize:30,
        fontWeight:"600",
        color:"#000",
        width: 150,
        height:70,
        borderRadius:50,
    }
});


export default Calculator;