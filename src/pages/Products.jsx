import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Content from '../components/Content'
import TableProduct from '../components/TableProduct'
import { toast } from 'react-toastify'
import MiniDrawer from '../components/MiniDrawer'
import pe1 from '../images/pe1.svg'
import './tableAll.css'
import './modal.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
// const hostProduct = process.env.REACT_APP_HOST_LINE_PRODUCT

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function createData(name, price, stock) {
    return { name, price, stock };
}

function Products() {
    const [products, setProducts] = useState([]); {/* Atualiza os dados do Banco */ }
    const [openModal, setOpenModal] = useState(false); {/* Abrir e fechar o modal */ }

    const [openModalEdit, setOpenModalEdit] = useState(false); {/* Abrir e fechar o modal */ }
    const [productToEdit, setProductToEdit] = useState({})

    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };



    const loadProducts = async () => {
        try {
            const response = await fetch('http://localhost:3100/product')
            const data = await response.json()
            setProducts(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProducts()
    }, []) // [] = executa apenas uma vez quando o componente é montados

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('Minha funcao de submit')
        console.log(event.target)
        const name = event.target.name.value
        const price = event.target.price.value
        const stock = event.target.stock.value
        const product = { name, price, stock }
        console.log(product)
        try {
            const response = await fetch('http://localhost:3100/product',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                })
            const data = await response.json()
            console.log(data)
            setOpenModal(false)
            loadProducts()
            toast.success('Produto criado com sucesso')
        } catch (error) {
            toast.error('Aconteceu um imprevisto, tente novamente mais tarde.')
        }

    }

    const handleEdit = async (event) => {
        event.preventDefault()
        const id = parseInt(event.target.id.value)
        const name = event.target.name.value
        const price = event.target.price.value
        const stock = event.target.stock.value
        const userEdited = { id, name, price, stock }
        try {
            const response = await fetch('http://localhost:3100/product',
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userEdited),
                })
            const data = await response.json()
            if (response.status === 200) {
                toast.success('Produto editado com sucesso!')
                const newProducts = products.map((product) => {
                    if (product.id === id) {
                        return userEdited
                    }
                    return product
                })
                setProducts(newProducts)
                setOpenModalEdit(false)
            } else {
                alert(data.message)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(handleSubmit)

    return (
        <>
            <MiniDrawer >
                <Content title='Produtos'>
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: '50%' }} aria-label="customized table" className='tabela'>
                            <TextField
                                label="Search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{ marginBottom: '16px' }}
                            />
                            <TableHead>
                                <Box direction="row" className='stack'>
                                    <h1 className='tituloTabela'>Seus Produtos</h1>
                                    <button className='botao' disabled={false} variant="filled" onClick={() => setOpenModal(true)}>Adicionar</button>
                                </Box>
                                <TableRow >
                                    <StyledTableCell align='left'>Produtos</StyledTableCell>
                                    <StyledTableCell align="left">Preço</StyledTableCell>
                                    <StyledTableCell align="left">Quantidade</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.length > 0 ?
                                    products.map((product, index) => (
                                        <TableProduct index={index} key={product.id} product={product} setProducts={setProducts} products={products} setProductToEdit={setProductToEdit} setOpenModalEdit={setOpenModalEdit} />
                                    )) : (
                                        <img src={pe1} alt="pe1" />
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>




                    {/* <Box className='caixaTabela'>
                        <table className='tabela'>
                            <thead>
                                <tr>
                                    <th colSpan={12} >
                                        <Box direction="row" className='stack'>
                                            <h1 className='tituloTabela'>Seus Produtos</h1>
                                            <button className='botao' disabled={false} variant="filled" onClick={() => setOpenModal(true)}>Adicionar</button>
                                        </Box>
                                    </th>
                                </tr>
                                <tr>
                                    <th className='coluna' align='left'>Produto</th>
                                    <th className='coluna' align='left'>Preço</th>
                                    <th className='coluna' align='left'>Quantidade</th>
                                    <th className='coluna' align='left'></th>
                                    <th className='coluna' align='left'></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length > 0 ?
                                    products.map((product, index) => (
                                        <TableProduct index={index} key={product.id} product={product} setProducts={setProducts} products={products} setProductToEdit={setProductToEdit} setOpenModalEdit={setOpenModalEdit} />
                                    )) : (
                                        <img src={pe1} alt="pe1" />
                                    )}
                            </tbody>
                        </table>
                    </Box> */}


                    {openModal &&
                        <Box className='modal' onClick={(event) => {
                            if (event.target.className.includes('modal')) {
                                setOpenModal(false)
                            }
                        }}>
                            <Box className='container'>
                                <div className='xizinho'><p onClick={() => setOpenModal(false)}>X</p></div>
                                <h2>Cadastrar produtos</h2>
                                <form onSubmit={handleSubmit} className='formModal'>
                                    <input type="text" name="name" placeholder="Nome" /><br />
                                    <input type="text" name="price" placeholder="Preço" /><br />
                                    <input type="int" name="stock" placeholder="Quantidade" /><br /><br />
                                    <button className='enviar' type='submit'>Enviar</button><br />
                                    <button className='fechar' onClick={() => setOpenModal(false)}>Fechar</button>
                                </form>
                            </Box>
                        </Box>
                    }

                    {openModalEdit &&
                        <Box className='modal' onClick={(event) => {
                            if (event.target.className.includes('modal')) {
                                setOpenModalEdit(false)
                            }
                        }}>
                            <Box className='container'>
                                <div className='xizinho'><p onClick={() => setOpenModalEdit(false)}>X</p></div>
                                <h2>Editar Produto</h2>
                                <form onSubmit={handleEdit} className='formModal'>
                                    <input type="hidden" name="id" value={productToEdit.id} />
                                    <input type="text" name="name" placeholder="Nome" value={productToEdit.name} onChange={e => setProductToEdit({ ...productToEdit, name: e.target.value })} /><br />
                                    <input type="text" name="price" placeholder="Preço" value={productToEdit.price} onChange={e => setProductToEdit({ ...productToEdit, price: e.target.value })} /><br />
                                    <input type="int" name="stock" placeholder="Quantidade" value={productToEdit.stock} onChange={e => setProductToEdit({ ...productToEdit, stock: e.target.value })} /><br /><br />
                                    <button className='enviar' type='submit'>Editar</button><br />
                                    <button className='fechar' onClick={() => setOpenModalEdit(false)}>Fechar</button>
                                </form>
                            </Box>
                        </Box>
                    }
                </Content >
            </MiniDrawer >
        </>
    )
}

export default Products