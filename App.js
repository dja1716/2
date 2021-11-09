import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import icons from "./icons";
import { Ionicons } from "@expo/vector-icons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485468";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  // values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const position2 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  // animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  // pan responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: async (_, { x0, y0 }) => {
        //position.setValue({ x: position2.x._value, y: position2.y._value });
        //position.setValue({ x: x0, y: y0 });
        console.log(x0, y0);
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        console.log(dx, dy);
        //position2.setValue({ x: dx, y: dy });
        //Animated.parallel([onPressOut, goHome]).start();
        onPressOut.start();
      },
      onPanResponderMove: (_, { dx, dy, x0, y0, moveX, moveY }) => {
        console.log(moveX, moveY);
        position.setValue({
          x: dx - windowWidth / 2 + x0,
          y: dy - windowHeight / 2 + y0,
        });
      },
    })
  ).current;
  // state
  return (
    <Container>
      <Edge>
        <WordContainer>
          <Word color={GREEN}>O</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Ionicons name="beer" color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer>
          <Word color={RED}>X</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Edge = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const Word = styled.Text`
  font-size: 38px;
  background-color: ${GREY};
  color: ${(props) => props.color};
  font-weight: 500;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 5px 10px;
  border-radius: 10px;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;
