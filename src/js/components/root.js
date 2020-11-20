import React, { Component, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import _ from 'lodash';
import HeaderBar from "./lib/header-bar.js"

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import dark from './themes/dark';

import { Text, Box, StatelessTextInput, Button } from '@tlon/indigo-react';

export const Root = () => {
  const [poke_name, poke_name_change] = useState("");
  const [poke_sprite, poke_sprite_change] = useState("thing");
  return (
    <BrowserRouter>
      <ThemeProvider theme={dark}>
      <Box display='flex' flexDirection='column' position='absolute' backgroundColor='white' height='100%' width='100%' px={[0,4]} pb={[0,4]}>
      <HeaderBar/>
      <Route exact path="/~test" render={ () => {
        return (
          <Box height='100%' p='4' display='flex' flexDirection='column' borderWidth={['none', '1px']} borderStyle="solid" borderColor="washedGray">
            <Text fontSize='1'>Pokedex</Text>
            <StatelessTextInput
              value={poke_name}
              onChange={(e) => poke_name_change(e.currentTarget.value)}
              hasError={(e) => alert(e)}
            ></StatelessTextInput>
            <Button children="Search" onClick={() => {
              window.urb.poke("zod", "test", "json", poke_name, () => 0, () => 0)
            }}/>
            <Text fontSize='1'>{poke_sprite}</Text>
          </Box>
        )}}
      />
      </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}
