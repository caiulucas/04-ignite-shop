import { styled } from '..';

export const BagItemContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  div: {
    p: {
      fontSize: '$md',
      color: '$gray300',
      lineHeight: 1.6
    },

    span: {
      marginTop: '0.125rem',
      fontWeight: 700,
      fontSize: '$md',
      color: '$gray100'
    },

    button: {
      color: '$green500',
      fontWeight: 700,
      fontSize: '$sm',
      margin: '0.5rem 0.5rem 0',

      '&:hover': {
        color: '$green300'
      }
    }
  }
});

export const ImageContainer = styled('div', {
  height: '5.875rem',
  width: '6.25rem',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover',
    width: 'auto',
    height: 'auto'
  }
});
