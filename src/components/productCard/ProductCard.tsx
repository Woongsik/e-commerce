import { 
  Box,
  Typography
} from '@mui/material';

import UiImage from '../ui/Image/UiImage';
import { Product } from '../../misc/types/Product';
import { Link } from 'react-router-dom';
import UiNoImage from '../ui/Image/UiNoImage';

type Props = {
  product: Product
}

export default function ProductCard(props: Props) {
  const { product } = props;

  return (
    <Box component={'div'} sx={{ minWidth: 100, maxWidth: 300, minHeight: 350 }}>
      <Link to={`/product/${product.id}`}
            style={{ textDecoration: 'none', color: 'black'}}>
        <Box component={'div'}>
          <Box component={'div'} width={300} height={300}>
            {(product.images && product.images[0]) ?
              <UiImage 
                src={product.images && product.images[0] ? product.images[0] :''}
                alt={product.title} />
            : <UiNoImage />
            }
          </Box>
          
          <Box component={'div'}>
            <Typography>{product.title}</Typography>
            <Typography color={'gray'}>{product.category.name}</Typography>
            <Typography>€ {product.price}</Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}
