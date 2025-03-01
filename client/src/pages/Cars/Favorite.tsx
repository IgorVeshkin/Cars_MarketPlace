import { FC } from "react";

// mui components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Mobx
import CarsMobx from "../../store/cars";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";

// API Server
import { API_URL } from "../../ApiServer";

const Favorite: FC = observer(() => {

    return (
        <div>
            <Header />

            <Typography variant='h4' sx={{ mt:5, mx: 3, pb: 3, borderBottom: 1, borderColor: 'grey.300', fontWeight: 'bold', }} >Избранные товары — {CarsMobx.carsFavorite.length} позиций</Typography>

            {/* Карточки машин */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }}>
            
            {CarsMobx.carsFavorite.map((car) => (
                
                <div key={car.id} css={{ margin: '20px', }}>

                <Box sx={{ color: '#00000', display: 'flex', borderBottom: 1, borderColor: 'grey.300', pb: 2, }}>
                    
                {/* Изображение машины */}
                {/* Поскольку в изначальном проекте не было директории static/images с изображениями автомобилей,
                    приведенные изображения нашел в интернете, соответственно не все изображения подходят идеально 
                */}
                <img
                src={API_URL + car?.img_src}
                alt={`${car.brand} ${car.model}`}
                css={{ width: "425px", height: '300px', border: '1px solid lightgray', borderRadius: '10px', opacity: car.availability ? 1 : 0.5, }}
                />

                <Box sx={{ marginLeft: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  }}>
                    <Typography variant="h4" sx={{ width: '400px', wordWrap: 'break-word', fontWeight: "bold", }}> { (car.brand + ' ' + car.model).length >= 28 ? (car.brand + ' ' + car.model).slice(0, 28) + '...' : (car.brand + ' ' + car.model) }</Typography>

                    <Typography variant="body1" sx={{ maxWidth: '1000px', }} >{ car.description.length >= 300 ? car.description.slice(0, 300) + '...' : car.description }</Typography>

                    <Typography variant="body2" sx={{ color: 'gray', }}>Год: {car.model_year}</Typography> 
                    <Typography variant="body2" sx={{ color: 'gray', }}>Цвет: {car.color}</Typography>

                    <Typography variant="h5" sx={{ fontWeight: "bold", }}>от {car.price}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row',  }} >
                        <Button variant="contained" sx={{ width: '250px', height: '50px', bgcolor: '#4F2CD9', }}>Выбрать комплектацию</Button>
                        <Button variant="outlined" color="error" sx={{ width: '50px', height: '50px', mx: 2, }} 
                            onClick={(e) => {
                                CarsMobx.removeFavorite(car);
                            }}
                        > <DeleteOutlineOutlinedIcon /> </Button>
                    </Box>
                </Box>

                </Box>
            </div>
            )
            
            )}
            </Box>
        </div>
    );
    
});

export default Favorite;