import { CSSProperties, FC, useCallback, useEffect, useState } from 'react';
import { Container, ButtonPlant } from '../components';
import  { PlantData, Fruit, Vegetable  } from '../types';
import data from '../utils/data.json';

interface SolutionPageProps {}

const SolutionPage: FC<SolutionPageProps> = () => {
    //ถ่้าจะให้ดีคิดว่าใช้ statement tools ex. redux, zustand, etc ดีกว่าครับ แต่ assignment นี้ลองทำแบบไม่ใช้ดู

    const [plants, setPlants] = useState<PlantData[]>([]);
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [vegetables, setVegetables] = useState<Vegetable[]>([]);
    const [isDebugOn, setisDebugOn] = useState<boolean>(false);

    const onBtnListClick = useCallback((plant: PlantData) => {
        plant.type === 'Fruit'
            ? setFruits((prevFruits) => [...prevFruits, plant as Fruit])
            : setVegetables((prevVegetables) => [...prevVegetables, plant as Vegetable]);
        setPlants((prevPlants) => prevPlants.filter((prevPlant) => prevPlant.name !== plant.name));
    }, []);

    const onBtnFruitClick = useCallback((plant: PlantData) => {
        setPlants((prevPlants) => [...prevPlants, plant]);
        setFruits((prevFruits) => prevFruits.filter((prevFruit) => prevFruit.name !== plant.name));
    }, []);

    const onBtnVegetableClick = useCallback((plant: PlantData) => {
        setPlants((prevPlants) => [...prevPlants, plant]);
        setVegetables((prevVegetables) => prevVegetables.filter((prevVegetable) => prevVegetable.name !== plant.name));
    }, []);

    const fetchPlant = () => {
        setPlants(data);
    };

    useEffect(() => {
        // จำลอง api
        fetchPlant()
    },[])

  return (
    <>
        <button 
            disabled={vegetables.length > 0 || fruits.length > 0} 
            onClick={() => setisDebugOn(!isDebugOn)} >
                { `Debug Mode:`} 
                <span style={{color: isDebugOn ? 'green' : 'red' }}>
                    { isDebugOn ? ' ON' : ' OFF' }
                </span>
        </button>

        <div style={style.layout}>
            <Container style={style.column}>
                {
                    plants.map((plant) => (
                        <ButtonPlant 
                            key={plant.name} 
                            item={plant}
                            onBtnClick={( plant ) => onBtnListClick(plant)}
                            canTimeOut={ false }
                        />
                    ))
                }
            </Container>
            <Container header={'Fruit'} style={style.column}>
                {
                    fruits.map((fruit) => (
                        <ButtonPlant 
                            key={fruit.name} 
                            item={fruit}
                            onBtnClick={( plant ) => onBtnFruitClick(plant)}
                            canTimeOut={ true }
                            isDebug={ isDebugOn }
                        />
                    ))
                }
            </Container>
            <Container header={'Vegetable'} style={style.column}>
                {
                    vegetables.map((vegetable) => (
                        <ButtonPlant 
                            key={vegetable.name} 
                            item={vegetable}
                            onBtnClick={( plant ) => onBtnVegetableClick(plant)}
                            canTimeOut={ true }
                            isDebug={ isDebugOn }
                        />
                    ))
                }
            </Container>
        </div>
    </>
  )
}
const style: Record<string, CSSProperties> = {
    layout: {
        display: 'flex',
        gap: '1%',
        margin: '5%'
    },
    column: {
        flex: 1,
    },
}

export default SolutionPage;