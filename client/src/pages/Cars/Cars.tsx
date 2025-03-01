import { FC } from "react";
import { useEffect, useState } from 'react';

// mui components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SwapVertIcon from '@mui/icons-material/SwapVert';

// Mobx
import CarsMobx from "../../store/cars";
import { observer } from "mobx-react-lite";

// components
import Header from "../../components/Header";

// API Server
import { API_URL } from "../../ApiServer";


const Cars: FC = observer(() => {
  const [searchData, setSearchData] = useState<string>('');

  // Функция для проверки находиться ли машина в списке "Избранных"
  // Вариант, чтобы не хранить массив id 'carsFavoriteIds' в CarsMobx

  
  const checkAvailability = (cars_array: any|[], car_id:number) => {
    return cars_array.some((current_car:any|[]) => {
        return car_id === current_car.id;
    });
  }
  

  const query = `query {
      cars {

        id,
        brand,
        model,
        color,
        model_year,
        img_src,
        price,
        description,
        availability

    }
  }`;

  useEffect(() => {

    // Получаю данные из GraphQL-сервера
    fetch(API_URL + '/api',

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
      })
      }
    )
      .then(response => response.json())
      .then(data => 
        {
          CarsMobx.fillCars(data.data.cars);
          // Дополнительно сортирую данные
          CarsMobx.sortCars(0);
        }
      );

    // Cleanup (if necessary)
    return () => {
      console.log('Cleanup if necessary');
    };
  }, []);

  return (
    <div>
      <Header />

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 5, mb: 2, }}>
        {/* Элемент сортировки */}

        <FormControl sx={{ m: 3, flex: 1, display: 'flex', flexDirection: 'row' }} size="small">
          <SwapVertIcon sx={{ marginRight: 1, }} />
          <Select
            id="sorting-select-small"
            variant="standard"
            disableUnderline
            value={CarsMobx.sortingType}
            onChange={(e) => 
              {

                CarsMobx.sortCars(Number(e.target.value));

              }
            }
            sx={{ 
              
              width: '200px',

             }}

             inputProps={{ IconComponent: () => null }}

          >
            <MenuItem value={0}>Сначала в наличии</MenuItem>
            <MenuItem value={1}>По имени (A-Z)</MenuItem>
            <MenuItem value={2}>По имени (Z-A)</MenuItem>
            <MenuItem value={3}>Сначало новее</MenuItem>
            <MenuItem value={4}>Сначала старше</MenuItem>
            <MenuItem value={5}>Сначала дешевле</MenuItem>
            <MenuItem value={6}>Сначала дороже</MenuItem>
          </Select>
        </FormControl>
        
        

        
        {/* Поисковая строка */}
        <TextField id="search-input" 
        placeholder="Найти Авто" 
        variant="outlined" 
        size="small" 
        sx={{ width: '425px', mx: 7.5, }} 
        onChange={(e) => {setSearchData(e.target.value);}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ bgcolor: '#4F2CD9', borderRadius: '5px', m: 0, }}>
              <IconButton
                onClick={(e) => {
                  
                  if (searchData.length === 0) {
                    console.log('В поле поиска отсутствует запрос!');

                    CarsMobx.restoreCars();
                    CarsMobx.sortCars(0);

                  } else {
                    
                    console.log('В поле поиска найден запрос! Запрос: ' + searchData.toLowerCase());

                    CarsMobx.findCar(searchData.toLowerCase());
                    CarsMobx.sortCars(0);

                  }

                }}
              >
                <SearchIcon sx={{ color: 'white', }} />
              </IconButton>
            </InputAdornment>
          ),
        }}

        />

      </Box>
      
      {/* Карточки машин */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
      
      {CarsMobx.carsData.map((car) => (
        
        <div key={car.id} css={{ margin: '20px', }}>

        <div css={{ color: '#00000', }}>

          {/* Блок с изображением машины и плашки 'Нет в наличии' */}
          <Box sx={{ position: 'relative', }} >

            <Box sx={{ display: car.availability ? 'none' : 'block', zIndex: 1, bgcolor: '#000000', borderRadius: '10px', position: 'absolute', textAlign: 'center', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', }}>
              <Typography variant="h5" sx={{ color: '#ffffff', p: 1, }} >Нет в наличии</Typography>
            </Box>

            <img
              src={API_URL + car?.img_src }
              alt={`${car.brand} ${car.model}`}
              css={{ width: "425px", height: '300px', border: '1px solid lightgray', borderRadius: '10px 10px 0 0', opacity: car.availability ? 1 : 0.5, }}
            />

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px', }}>
              <Typography variant="h5" sx={{ width: '400px', wordWrap: 'break-word', }}> { (car.brand + ' ' + car.model).length >= 28 ? (car.brand + ' ' + car.model).slice(0, 28) + '...' : (car.brand + ' ' + car.model) }</Typography>

              <Box sx={{ display: 'flex', columnGap: '30px', }}>
                <Typography variant="body2" sx={{ color: 'gray', }}>Год: {car.model_year}</Typography> <Typography variant="body2" sx={{ color: 'gray', }}>Цвет: {car.color}</Typography>
              </Box>
            <Typography variant="body1" sx={{ fontWeight: "bold", }}>от {car.price}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '30px', mt: 2, }} >
            <Button variant="contained" disabled={!car.availability} sx={{ width: '250px', height: '50px', bgcolor: '#4F2CD9', }}>Купить</Button>
            {!checkAvailability(CarsMobx.carsFavorite, car.id) ?

            (<>
            {/* Кнопка "Добавить в избранное"  */}
            <IconButton disabled={!car.availability}
              onClick={(e) => {
                
                CarsMobx.addFavorite(car);

              }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 32, }} />
            </IconButton>
            </>) 

            :
              <FavoriteIcon sx={{ mx: 1, fontSize: 32, color: "#240C86", }} />
            }

            
            { /*

              Способ, чтобы отслеживать избранные товары без дополнительного массива в CarsMobx
              CarsMobx.carsFavoriteIds.includes(car.id)

              Способ, чтобы отслеживать избранные товары без carsFavoriteIds в CarsMobx
              checkAvailability(CarsMobx.carsFavorite, car.id) ? 'true2' : 'false2'
            */ }

          </Box>
        </div>
      </div>
      )
      
      )}
      </Box>
    </div>
  );
});

export default Cars;
