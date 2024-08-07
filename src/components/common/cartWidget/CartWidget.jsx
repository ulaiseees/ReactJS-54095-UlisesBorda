

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

export const CartWidget = () => {
  
  const {getTotalItems} = useContext(CartContext)
  let total = getTotalItems()
  
  return (
    <div>
      <Link to={"/cart"}>
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={total} color="secondary" showZero>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
    </Link>
    </div>
  )
}
