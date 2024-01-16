import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import React, { useState } from "react";
import Font from "../constants/Font";

const AppTextInput = ({ ...otherProps }) => {

    const [focused, setFocused] = useState(false);

    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[
                {
                    fontFamily: Font["poppins-regular"],
                    fontSize: 15,
                    padding: 15,
                    marginVertical:10,
                    borderWidth: 1,
                    borderColor:'#fff',
                    backgroundColor: '#EFF2FF',
                    borderRadius: 10,
                    shadowOffset: { width: 4, height: 10 },
                    shadowColor: '#80B905',
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                },
                focused && {
                    borderWidth: 1,
                    borderColor: '#80B905',
                    shadowOffset: { width: 4, height: 10 },
                    shadowColor: '#80B905',
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                },

            ]}
            {...otherProps}
        />

    );
}


export default AppTextInput;