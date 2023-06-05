import React, { useEffect, useState } from 'react'
import './Produto.css'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TableProduct from '../components/TableProduct'
import NavBar from '../components/NavBar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Content from '../components/Content'
import { toast } from 'react-toastify'

function Products() {
    const [products, setProducts] = useState(false); {/* Atualiza os dados do Banco */}
    const [openModal, setOpenModal] = useState(false); {/* Abrir e fechar o modal */}

    // console.log(products)

    // const OpenModal = () => {
    //     setOpenModal(true)
    // }

    // const CloseModal = () => {
    //     setOpenModal(false)
    // }

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
        const product = {name, price, stock}
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
            toast.error('Aconteceu um imprevisto, tente novamente mais tarde')
        }
    }

    return (
      <>
      <Content>
      <NavBar></NavBar>
        <Box sx={{ display: 'flex'}}>
            <table  style={{boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.15)', borderRadius: '10px', margin: '10px auto',  width: '50%', height: 'auto', background: 'white', borderCollapse: 'collapse'}}>
            
            
            <tr>
                <th colSpan={5}>
                <Stack container direction="row" sx={{alignItems: 'center', margin: '0 0 0 auto', width: '100%', justifyContent: 'space-between', paddingBottom: '30px'}}>
                <h1 style={{paddingLeft: '45px', paddingTop: '10px'}}>Seus Produtos</h1>
                <button disabled={false} variant="filled" style={{height: '40px', width: '150px', borderRadius: '8px', background: '#0F9AFE' , border: '0px', color: 'white', marginRight: '45px', marginTop: '10px'}} onClick={() => setOpenModal(true)}>Adcionar</button>
                </Stack>
                </th>
            </tr>

                <tr>
                    <th align="left" style={styles.tabela}>Produto</th>
                    <th align="left" style={styles.tabela}>Preço</th>
                    <th align="left" style={styles.tabela}>Quantidade</th>
                    <th align="left" style={styles.tabela}></th>
                    <th align="left" style={styles.tabela}></th>
                </tr>
                {products &&
                    products.map(product => (
                    <TableProduct key={product.id} product={product} setProducts={setProducts} products={products}/>
                ))}
            </table>
        </Box>
        {openModal && 
            <Box className='modal' onClick={(event) => {
                if(event.target.className.includes('modal')){
                    setOpenModal(false)
                }
            }}>
                <Box className='container'>
                    <div className='xizinho'><p onClick={() => setOpenModal(false)}>X</p></div>
                    <h2>Cadastrar produtos</h2>
                    <form onSubmit={handleSubmit} className='formModal'>
                        <input type="text" name="name"  placeholder="Nome"/><br/>
                        <input type="text" name="price"  placeholder="Preço"/><br/>
                        <input type="int" name="stock"  placeholder="Quantidade"/><br/><br/>
                        <button className='enviar' type='submit'>Enviar</button><br/>
                        <button className='fechar' onClick={() => setOpenModal(false)}>Fechar</button>
                    </form>
                </Box>
            </Box>
        }
        </Content>
      </>
    )
  }

  const styles = {
    tabela: {
        fontSize: '24px',
        fontStyle: 'normal',
        lineHeight: '34px',
        color: '#252525',
        borderBottom: '1px solid #ddd',
        padding: '18px 23px'
    }
  }

export default Products