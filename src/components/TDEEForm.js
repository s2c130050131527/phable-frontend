import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Select, Text, useToast } from "@chakra-ui/react"
import { useRef } from "react";

function TDEEForm({ onChange }) {

    const weightRef = useRef(null);
    const bodyFatRef = useRef(null);
    const activityRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        onChange({
            weight: weightRef.current.value,
            bodyFat: bodyFatRef.current.value,
            activityId: activityRef.current.value
        })
    }
    return (
        <Flex pt={12}>
            <form style={{ width: '25vw' }} onSubmit={onSubmit}>

                <Box>
                    <Text fontSize="16px">Welcome to TDEE Calculator</Text>
                    <Text fontSize="30px" fontWeight="bold">Enter your details</Text>
                </Box>
                <Flex>
                    <Box mr="15px" mt="15px">
                        <FormControl id="weight">
                            <FormLabel>Weight</FormLabel>
                            <Input type="number" ref={weightRef} placeholder="Kg" />
                            <FormHelperText>Enter your weight in Kg</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box mt="15px">
                        <FormControl id="fat">
                            <FormLabel>Body Fat Percentage</FormLabel>
                            <Input type="number" ref={bodyFatRef} placeholder="15%" />
                            <FormHelperText>Default is 15%</FormHelperText>

                        </FormControl>
                    </Box>
                </Flex>
                <Box mt="15px">
                    <FormControl id="activity">
                        <FormLabel>Select your daily activity level</FormLabel>
                        <Select placeholder="Select option" ref={activityRef} >

                            <option value="sedentry" selected>Sedentary (1-2 days a week, maybe)</option>
                            <option value="light">Light (2-4 days a week)</option>
                            <option value="moderate">Moderate (4-5 days a week)</option>
                            <option value="heavy">Heavy Exercise (Everyday)</option>
                            <option value="extreme">Athlete</option>


                        </Select>
                        <FormHelperText>Default is sedentary</FormHelperText>

                    </FormControl>
                </Box>

                <Box mt={4}>
                    <Button colorScheme="whatsapp" width="100%" type="submit">Calculate TDEE</Button>
                </Box>
            </form>
        </Flex>
    )
}

export default TDEEForm
