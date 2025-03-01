import { FC } from "react";

// mui components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useNavigate } from "react-router-dom";


const Header: FC = () => {

    const navigation = useNavigate();

    return (
        <>
        {/* Header */}
        <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'grey.300', }} >
        {/* Заголовок и кнопка 'Каталог' */}
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', my: 2, mx: 5, flex: 1, }}>
            <Typography variant="h5">
            <span style={{color: '#6C47FF', fontWeight: 'bold'}}>КУПИ</span>АВТО
            </Typography>
            <Button variant="contained" sx={{bgcolor: '#4F2CD9',}} startIcon={<MenuIcon />}
            onClick={(e) => {
                
                navigation('/');

            }}
            >Каталог</Button>
        </Box>

        {/* Адрес и номер телефона организации */}
        <Box sx={{ display: 'flex', alignItems: 'center',  columnGap: '30px', }}>
            <Typography variant="body1">
            Москва, Волгоградский пр-кт, 43, стр 1 
            </Typography>

            <Typography variant="body1">
            +7 800 555 35 35
            </Typography>
        </Box>

        {/* Кнопка 'Избранные' */}
        <Box sx={{ display: 'flex', alignItems: 'center',  columnGap: '30px', marginLeft: '10%', marginRight: 7.5, }}>
            <Button sx={{ color: "#4F2CD9", }} startIcon={<FavoriteIcon />}
            onClick={(e) => navigation('/favorite')}
            ><span style={{ color: '#000000', }}>Избранное</span></Button>
        </Box>
        </Box>
        </>
    );
};

export default Header;
