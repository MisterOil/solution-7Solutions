import { CSSProperties, FC, ReactNode } from 'react'

interface ContainerProps {
    header?: string;
    style: CSSProperties | undefined;
    children?: ReactNode[] | undefined;
}

const Container: FC<ContainerProps> = ({ header, style, children}) => {
    return (
        <div style={style}>
          {header && (
            <div style={styleContainer.header}>
              <div>{header}</div>
            </div>
          )}
          <div style={header ? styleContainer.body :styleContainer.listBody}>
            {children}
          </div>
        </div>
    );
}

const styleContainer: Record<string, CSSProperties> = {
    header: {
        textAlign: 'center',
        backgroundColor: '#e6e6e6',
        fontFamily: 'sans-serif',
        fontSize: '20px',
        padding: '3%',
        border: '1px solid #ccc',
    },
    body: {
        paddingTop: '1%',
        height: '720px',
        overflowY: 'scroll',
        border: '1px solid #ccc',
        borderTop: 'none',
    },
    listBody: {
        marginTop:'11%',
        // height: '500px',
        // overflowY: 'scroll',
    }
}

export { Container }