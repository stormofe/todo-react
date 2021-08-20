import './App.css';
import React, {useState, useEffect} from 'react';
import {v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable'

function App() {

	const [item, setItem] = useState('');
	const [items, setItems] = useState(
		JSON.parse(localStorage.getItem('items')) || []
	)

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items))
	}, [items])

	const newItem = () => {
		if(item.trim() !== '') {
			const newItem = {
				id: uuidv4(),
				item, 
				color: randomColor({
					luminosity: 'light'
				}),
				defaultPos: {
					x: 300,
					y: -300
				}
			}
			setItems((items) => [...items, newItem]);
			setItem('');

		} else {
			alert('Add something')
			setItem('');

		}
	}

  return (
	  <div className="App">
		  <div className="wrapper">
			  <input 
			  type="text" 
			  placeholder="Add new task"
			  onChange={(e) => setItem(e.target.value)}/>
			  <button className="enter" onClick={newItem}>Add</button>
		  </div>
		  {
			  items.map((item, index) => {
				return (
					<Draggable key={index} defaultPosition={item.defaultPos}>
						<div className="todo__item" style={{backgroundColor: item.color}}>
							{`${item}`}
							<button className="delete">X</button>
						</div>
					</Draggable>
				)
			  })
		  }
	  </div>
  )
}

export default App;
