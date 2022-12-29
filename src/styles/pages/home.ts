import { styled } from '..';

export const HomeContainer = styled('main', {
  display: 'flex',
  marginLeft: 'auto',

  width: '100%',
  maxWidth: 'calc(100vw - (100vw - 73.75rem) / 2)',
  minHeight: 656
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '8px',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  minWidth: '540px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  },

  img: {
    objectFit: 'cover',
    width: 'auto',
    height: 'auto'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 700,
      color: '$green300'
    }
  }
});
