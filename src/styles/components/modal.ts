import { styled } from '..';

export const ModalContainer = styled('div', {
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100vh',
  width: '100%',
  zIndex: 1
});

export const Modal = styled('div', {
  position: 'absolute',
  right: 0,
  top: 0,
  backgroundColor: '$gray800',
  width: '30rem',
  height: '100vh',
  boxShadow: '1rem 0 1rem 1rem rgba(0,0,0,0.6)',

  nav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: '1.5rem',

    button: {
      svg: {
        width: '1.5rem',
        height: '1.5rem',
        color: '$gray500',
        transition: 'color 0.2s'
      },

      '&:hover': {
        svg: {
          color: '$gray100'
        }
      }
    }
  }
});

export const BagItems = styled('div', {
  padding: '1.5rem 3rem 3rem',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  h2: {
    fontSize: '$lg'
  },

  '>section': {
    marginTop: '2rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  }
});

export const BagInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '$sm',
    marginTop: '0.5rem',

    label: {
      color: '$gray100',

      strong: {
        fontSize: '$md'
      }
    },

    p: {
      fontSize: '$md',
      color: '$gray300'
    },

    span: {
      color: '$gray100',
      fontSize: '$xl',
      fontWeight: 700
    }
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$green300',
    borderRadius: 8,
    width: '100%',
    height: '4.25rem',
    marginTop: '3.5rem',

    fontSize: '$md',
    fontWeight: 700,
    color: '$white',
    transition: 'all 0.2s',

    '&:hover': {
      backgroundColor: '$green500'
    }
  }
});
