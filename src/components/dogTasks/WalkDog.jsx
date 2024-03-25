import * as React from 'react';
// import DogTaskDescription from '../DogTaskDescription'
import { yellow, blueGrey, lightBlue, teal } from '@mui/material/colors';
import { useState, useContext } from 'react'
import { Button, Checkbox, FormGroup, FormControlLabel, TextField} from '@mui/material';
import TaskContext from '../../context/TaskContext'
import Card from '@mui/material/Card'
// import PottyCheckboxes from './PottyCheckboxes';

export default function WalkDog(){
    // const [input, setInput] = useState('')
    const [timeSpent, setTimeSpent] = useState('')
    const [pottyStatus, setPottyStatus] = useState([false, false])
    const [peedCheckboxStatus, setPeedCheckboxStatus] = useState(false)
    const [poopedCheckboxStatus, setPoopedCheckboxStatus] = useState(false)
    
    const {addTask} = useContext(TaskContext)

    // async function test(finalPottyStatus) {
    //     if (pottyStatus[0] === true && pottyStatus[1] === true){
    //         finalPottyStatus = 'Peed and pooped'
    //     } else if (pottyStatus[0] === true && pottyStatus[1] === false){
    //         finalPottyStatus = 'Peed'
    //     } else if (pottyStatus[0] === false && pottyStatus[1] === true){
    //         finalPottyStatus = 'Pooped'
    //     } else {
    //         finalPottyStatus = 'Did not potty at all.'
    //     }
    // }

    console.log(pottyStatus)

    function handleSubmit(event) {
        let finalPottyStatus = ''
        event.preventDefault()
        // console.log('19:',peedCheckboxStatus, poopedCheckboxStatus, pottyStatus)
        console.log('22:', peedCheckboxStatus, poopedCheckboxStatus, pottyStatus);
        if (pottyStatus[0] === true && pottyStatus[1] === true){
            finalPottyStatus = 'Peed and pooped'
        } else if (pottyStatus[0] === true && pottyStatus[1] === false){
            finalPottyStatus = 'Peed'
        } else if (pottyStatus[0] === false && pottyStatus[1] === true){
            finalPottyStatus = 'Pooped'
        } else {
            finalPottyStatus = 'Did not potty at all.'
        }
        
        console.log('32:', peedCheckboxStatus, poopedCheckboxStatus, finalPottyStatus);
        const newTask = {
            title: 'Dog Walk',
            duration: timeSpent,
            potty: finalPottyStatus
        };
        addTask(newTask);
    }

    function handlePeeCheckBox (event) {
        console.log('41', event.target.checked)
        const check = event.target
        switch (true){
            case check.checked === true:
                setPeedCheckboxStatus(true);
                const yesPottyArray = [...pottyStatus];
                yesPottyArray.splice(0, 1, true);
                setPottyStatus(yesPottyArray);
                break;
            case check.checked === false:
                setPeedCheckboxStatus(false);
                const noPottyArray = [...pottyStatus];
                noPottyArray.splice(0, 1, false);
                setPottyStatus(noPottyArray);
                break;
            default:
                // setPottyStatus('Did not go potty.')
                break;
            }
    }

    function handlePoopCheckBox (event) {
        console.log('41', event.target.checked)
        const check = event.target

        switch (true){
            case check.checked === true:
                setPoopedCheckboxStatus(true);
                const yesPottyArray = [...pottyStatus];
                yesPottyArray.splice(1, 1, true);
                setPottyStatus(yesPottyArray);
                break;
            case check.checked === false:
                setPoopedCheckboxStatus(true);
                const noPottyArray = [...pottyStatus];
                noPottyArray.splice(1, 1, false);
                setPottyStatus(noPottyArray);
                break;
            default:
                // setPottyStatus('Did not go potty.')
                break;
            }
    }
    
    // async function handleCheckBox (event) {
        // const check = event.target
        // console.log('56', check.name, check.checked)

        // await pottyCheckboxes(event)

        // if (peedCheckboxStatus === true && poopedCheckboxStatus === true){
        //     setPottyStatus('Peed and pooped')
        // } else if (peedCheckboxStatus === true && poopedCheckboxStatus === false){
        //     setPottyStatus('Peed')
        // } else if (peedCheckboxStatus === false && poopedCheckboxStatus === true){
        //     setPottyStatus('Pooped')
        // } else {
        //     setPottyStatus('Did not potty at all.')
        // }
    //     return pottyStatus
	// }

    return(
        <Card
        key={'WalkDogKey'}
        sx={{flexDirection: 'reverse', alignItems: 'center', width: '100%', alignSelf: 'center', backgroundColor: lightBlue[200], borderColor:'black', color: 'black', borderRadius: 2, border: 2, '&:hover':{backgroundColor:teal[200], borderColor:'black'} }}
        align='center'>
        <form onSubmit={handleSubmit}>
            <div
            align='center'
            >
                Walk Dog
            </div>
            <div>
            <TextField
                    id="standard-textarea"
                    label={"Time Spent:"}
                    placeholder=". . ."
                    multiline
                    variant="standard"
                    sx={{width: '75%', color: 'black'}}
                    color = 'primary'
                    value={timeSpent}
                    onInput={event=>setTimeSpent(event.target.value)}
                  />
            </div>
            <div>
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox
                                    sx={{ml:0}}
                                />} 
                        name="peedCheckbox"
                        label="Peed?"
                        labelPlacement="start"
                        onInput={event=>handlePeeCheckBox(event)}
                        sx={{width: '25%', ml: 2.5}}
                        />
                        <FormControlLabel 
                        control={<Checkbox
                                    sx={{ml:0}}
                                />} 
                        name="poopedCheckbox"
                        label="Pooped?"
                        labelPlacement="start"
                        onInput={event=>handlePoopCheckBox(event)}
                        sx={{width: '25%', ml: 2.5}}
                        />
                </FormGroup>
            </div>
            {/* <div>
                <DogTaskDescription/>
            </div> */}
            <Button 
                type="submit"
                variant="outlined"
                display='inline-flex'
                sx={{width: '33%', alignSelf: 'center', backgroundColor: lightBlue[200], borderColor:'black', color: blueGrey[900], fontWeight: 'bold', mt: -4, '&:hover':{backgroundColor:yellow[200], borderColor:'black'} 
                }}
                onClick={addTask}
            >
                Log Task
            </Button>
            </form>
        </Card>
        
    )
}