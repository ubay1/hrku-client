import React, {useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HTTPGetProfil, HTTPUpdateFotoProfil } from '../../api/user'
import Header from '../../components/Header'
import { Base } from '../../layout/base'
import { AppDispatch } from '../../store'
import { RootState } from '../../store/rootReducer'
import { setAuthStatus, setReduxUsersProfile } from '../../store/user'
import Cookies from "js-cookie";
import Logo from "../../assets/images/hrlogo.png";
import Blank from "../../assets/images/blank.png";
import Image from "next/image";
import { RiCropLine, RiMailLine, RiMapPin2Line, RiMenLine, RiPencilLine, RiPhoneLine, RiQuestionLine, RiWomenLine } from 'react-icons/ri'
import { FormControl, InputLabel, Input, InputAdornment, Button, FormHelperText } from '@material-ui/core'
import DialogMigrate from '../../components/Dialog'
import { useForm } from "react-hook-form";
import { IUserProfilValidation } from '../../types/formValidation'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import router from 'next/router'
import { Slide, toast } from 'react-toastify';
import moment from 'moment'

export async function getServerSideProps(context: any) {
  
  try {
    const replaceToken = context.req.headers.cookie.replace('token=', '')
    const response = await HTTPGetProfil({token: replaceToken})
    console.log(response.data)
    const data = response.data.data
    return {
      props: {
        data: data
      },
    }
  } catch (error) {
    return {
      props: {
        data: error
      },
    }
  }
}

interface IDataUser {
  data: {
    fullname: string;
    address: string;
    phone: string;
    email: string;
    foto: any;
    gender: any;
    role: { 
      role_name: string, 
      slug_role_name: string
    }
  }
}

// const ChildEditFotoProfil = () => {
//   return(
//     <div className="mb-8 mt-6">
//       <div>
//         <input type="file" accept="image/*" onChange={onChange} />
//       </div>

//       <Cropper
//         zoomTo={0.5}
//         initialAspectRatio={1}
//         className="overflow-hidden my-2 h-52 w-full"
//         src={image}
//         viewMode={1}
//         minCropBoxHeight={10}
//         minCropBoxWidth={10}
//         background={false}
//         responsive={true}
//         autoCropArea={1}
//         checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
//         onInitialized={(instance) => {
//           setCropper(instance);
//         }}
//         guides={true}
//       />

//       <Button size="small" onClick={getCropData} color="primary" variant="contained"
//         className={`absolute ${image === '' ? 'hide_btn_crop' : 'show_btn_crop'}`}
//         style={{borderRadius: '0px 0px 10px 10px', bottom: '8px', padding: '8px'}}
//         fullWidth
//       >
//         <RiCropLine size="20px" className="mr-1"/> Crop
//       </Button>

//       {
//         cropData !== '' ?
//         <div className=" w-3/6 mt-2">
//           <div>Preview</div>
//           <img className="h-full w-full object-cover" src={cropData} alt="cropped" />
//         </div>
//         : <div></div>
//       }
//     </div>
//   )
// }

const Profil = ({data}: IDataUser) => {
  toast.configure()
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()

  const myAvatar = process.env.PHOTO_URL+data.foto+'?'+moment()

  /* -------------------------------------------------------------------------- */
  /*                                    state                                   */
  /* -------------------------------------------------------------------------- */
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [disableBtnSubmit, setDisableBtnSubmit] = React.useState(false);

  const [openEditFoto, setOpenEditFoto] = useState(false);
  const [openEditProfil, setOpenEditProfil] = useState(false);

  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();

  React.useEffect(() => {
    return () => {
      myAvatar
    }
  }, [myAvatar])

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                 handle form                                */
  /* -------------------------------------------------------------------------- */
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IUserProfilValidation>();
  const onSubmits = (data: any) => {};
  
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const handleOpenEditFoto = () => {
    setOpenEditFoto(true);
  };

  const handleOpenEditProfil = () => {
    setOpenEditProfil(true);
  };

  const handleClose = () => {
    setOpenEditFoto(false);
    setOpenEditProfil(false);
    setCropData('')
  };

  const httpUpdateFotoProfil = async () => {
    setLoadingSubmit(true)
    setDisableBtnSubmit(true)

    try {
      const response = await HTTPUpdateFotoProfil({
        foto: cropData,
        token: userRedux.token
      })

      if (response.status === 201) {
        try {
          const responseProfil = await HTTPGetProfil({token: userRedux.token})
          dispatch(setReduxUsersProfile({
            fullname: responseProfil.data.data.fullname,
            address: responseProfil.data.data.address,
            phone: responseProfil.data.data.phone,
            email: responseProfil.data.data.email,
            role_name: responseProfil.data.data.role.role_name,
            slug_role_name: responseProfil.data.data.role.slug_role_name,
            foto: responseProfil.data.data.foto,
            gender: responseProfil.data.data.gender,
          }))
          
          toast('sukses update foto profil', {
            position: "bottom-right",
            autoClose: 5000,
            type: 'success',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            transition: Slide
          })
          
          setLoadingSubmit(false)
          setDisableBtnSubmit(false)
          handleClose()
          setImage('')
        } catch (error: any) {
          const errors = JSON.parse(JSON.stringify(error))
          toast(errors.message, {
            position: "bottom-right",
            autoClose: 5000,
            type: 'error',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            transition: Slide
          })
          setLoadingSubmit(false)
          setDisableBtnSubmit(false)
          handleClose()
          setImage('')
        }
      }

    } catch (error) {
      const errors = JSON.parse(JSON.stringify(error))
      console.log(errors)
      // if (errors.statusCode === 401) {
      //   toast('email / password salah', {
      //     position: "bottom-right",
      //     autoClose: 5000,
      //     type: 'error',
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     transition: Slide
      //   })
      // }
      setLoadingSubmit(false)
      setDisableBtnSubmit(false)
      handleClose()
      setImage('')
    }
  }
  
  /* -------------------------------------------------------------------------- */
  /*                                 show page                                  */
  /* -------------------------------------------------------------------------- */
  return (
    <div>
      <Base>
        <div className="h-screen profil bg-white">
          <Header />

          <div className=" flex flex-col justify-center items-center">
            <div className="card mt-6 mb-11 flex flex-col justify-center items-center 
            rounded-lg shadow-lg w-8/12">
              <div className="bg-foto py-4 flex flex-col justify-center items-center relative h-full w-full">
                <div className="bg-foto-backdrop"></div>
                <div className="foto mt-4 relative">
                  {
                    data.foto ?
                    <Image 
                      className="rounded-full pointer-events-none"
                      blurDataURL={myAvatar}
                      placeholder="blur"
                      src={myAvatar}
                      width="100"
                      height="100"
                      layout="intrinsic" 
                      objectFit="cover"
                    />
                    :
                    <Image 
                      className="rounded-full pointer-events-none"
                      blurDataURL={Blank as any}
                      src={Blank}
                      width="100" height="100"
                      layout="fixed" 
                      objectFit="cover"
                    />
                  }

                <div className="mt-2 cursor-pointer shadow-lg absolute right-1 bottom-2 bg-white p-1 rounded-full"
                  onClick={handleOpenEditFoto}
                >
                  <RiPencilLine color="red" size="20px"/>
                </div>
                </div>
                <div className="mt-2 cursor-pointer shadow-lg absolute right-2 top-1 bg-white p-1 rounded-full"
                  onClick={handleOpenEditProfil}
                >
                  <RiPencilLine color="red" size="20px"/>
                </div>
                <div className="role relative flex flex-col items-center justify-center">
                  <div className="fullname text-lg text-white font-bold">{data.fullname}</div>
                  <div className="rolename bg-red-500 px-2 rounded-md text-white">
                    {data.role.role_name}
                  </div>
                </div>
              </div>

              <div className="detailuser w-full mt-6 mb-6">
                <div className="email flex flex-col text-sm justify-center items-center">
                  <div className="bg-red-50 p-2 rounded-full">
                    <RiMailLine color="red" size="20px"/>
                  </div>
                  <div>
                    {data.email}
                  </div>
                </div>
                <div className="phone flex flex-col text-sm justify-center items-center">
                  <div className="bg-green-50 p-2 rounded-full">
                    <RiPhoneLine color="green" size="20px"/>
                  </div>
                  <div>
                    {data.phone}
                  </div>
                </div>
                <div className="address flex flex-col text-sm justify-center items-center">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <RiMapPin2Line color="blue" size="20px"/>
                  </div>
                  <div>
                    {data.address}
                  </div>
                </div>
                <div className="gender flex flex-col text-sm justify-center items-center">
                  <div className="bg-yellow-50 p-2 rounded-full">
                    { data.gender === null ? <RiQuestionLine color="orange" size="20px"/> : 
                      data.gender === 'P' ? <RiWomenLine color="orange" size="20px"/> :
                      <RiMenLine color="orange" size="20px"/>
                    }
                  </div>
                  {'unknown' ?? data.gender}
                </div>
              </div>
            </div>
          </div>
          
          {/* dialog update foto profil */}
          <DialogMigrate
            open={openEditFoto ? openEditFoto : openEditProfil}
            disableEscapeKeyDown
            disableBackdropClick
            onClose={handleClose}
          >
            <div className="m-5">
              <div className="text-lg">
                {openEditFoto ? 'Edit Foto Profil' : 'Edit Profil'}
              </div>

              <div className="mb-8 mt-6">
                <div>
                  <input type="file" accept="image/*" onChange={onChange} />
                </div>

                <Cropper
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  className="overflow-hidden my-2 h-52 w-full"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  guides={true}
                />

                <Button size="small" onClick={getCropData} color="primary" variant="contained"
                  className={`absolute ${image === '' ? 'hide_btn_crop' : 'show_btn_crop'}`}
                  style={{borderRadius: '0px 0px 10px 10px', bottom: '8px', padding: '8px'}}
                  fullWidth
                >
                  <RiCropLine size="20px" className="mr-1"/> Crop
                </Button>

                {
                  cropData !== '' ?
                  <div className=" w-3/6 mt-2">
                    <div>Preview</div>
                    <img className="h-full w-full object-cover" src={cropData} alt="cropped" />
                  </div>
                  : <div></div>
                }
              </div>

              <div className="flex justify-end">
                <div className="mr-2">
                  <Button 
                    size="small" 
                    onClick={handleClose} 
                    color="secondary" 
                    variant="outlined"
                    disabled={disableBtnSubmit}
                  >
                    Batal
                  </Button>
                </div>
                <div>
                  <Button 
                    size="small" 
                    onClick={httpUpdateFotoProfil} 
                    color="primary" 
                    variant="contained"
                    disabled={disableBtnSubmit}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </DialogMigrate>
        </div>
      </Base>
    </div>
  )
}

export default Profil
