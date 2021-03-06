import {useState} from 'react'
import Loading from '../UI/Loading'
import Modal from '../UI/Modal'


const UploadForm = () =>{
    const url = import.meta.env.VITE_SERVER_URL
    const [isLoading, setIsLoading] = useState(false)
    const [inputState, setInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [previewState, setPreviewState] = useState()
    const [resultState, setResultState] = useState()
    const [errorState, setErrorState] = useState()

    const uploadFileHandler = (e) =>{
        setErrorState(false)
        const file = e.target.files[0]
        if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'){
            previewImage(file) 
            setSelectedFile(file)
            setInputState(e.target.value)
        } else {
            setErrorState('Invalid File Type!')
            setInputState('')
            setPreviewState('')
        }

    }

    const previewImage = (file) =>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
        setPreviewState(reader.result)
        }
    }
    

    const submitUploadHanlder = async (e) =>{
        e.preventDefault()
        if(errorState){
            return
        }
        uploadImage(selectedFile)
    }

    const uploadImage = async (file) =>{
        try {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('image', file)
        
        const response = await fetch(`${url}/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json()
        setResultState(data)
        setPreviewState('');
        setInputState('')
        setIsLoading(false)
        } catch (err) {
            console.error(err);
            setIsLoading(false)
            
        }
    }

    if(isLoading){
        return <Modal>
            <Loading />
        </Modal>
    }

    return (
        <>
        <form onSubmit={submitUploadHanlder} encType='multipart/form-data'>
            <input type='file' name='image' value={inputState} onChange={uploadFileHandler} />
            <button type='submit'>Submit</button>
        </form>
        {previewState && <img src={previewState} alt='testing' style={{height: '300px'}} />}
        {resultState && (
            <div>
                <h3>Image successfully uploaded</h3>
                <p>URL: <a href={resultState.image}>Link</a></p>
                <img src={resultState.image} alt='some image' style={{height: '300px'}} />
            </div>
        )}
        {errorState && (
            <div>
                <h3>Error Uploading Image</h3>
                <p>Error: {errorState}</p>
            </div>
        )}
        </>
    )
}

export default UploadForm