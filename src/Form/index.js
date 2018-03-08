import { React } from "react";
import  styled from "styled-components";

const Colors = {
	border: '#c3c3c3',
	input: '#3d3d3d',
	focus: '#7bbfe0',
	label: '#5a5a5a'
}

const Button = styled.button`
	background: ${props => props.primary ? 'green' : 'white'};
	color: ${props => props.primary ? 'white' : '#545454'};

	font-size: 1em;
	padding: 0.5em 1em;
	border: 1px solid ${Colors.border};
	border-radius: 3px;
	margin-right: 0.3em;

	&:hover {
		cursor: pointer;
	}

	&:focus {
		outline: none;
	}

`;

const Input = styled.input.attrs({
	// we can define static props
	type: 'password',

	// or we can define dynamic ones
	margin: props => props.size || '0.5em',
	padding: props => props.size || '0.5em'
})`
	color: ${Colors.input};
	font-size: 1em;
	border: 1px solid ${Colors.border};
	border-radius: 3px;

	/* here we use the dynamically computed props */
	padding: ${props => props.padding};

	&:focus {
		border: 1px solid ${Colors.focus};
		outline: none;
	}
`;

const Label = styled.label`
	display: flex;
	padding: 0.5em 0;
	font-size: 1em;
	color: ${Colors.label}
`


export  { Button,Input, Label }