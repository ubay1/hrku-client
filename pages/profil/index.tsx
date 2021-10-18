import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HTTPGetProfil, HTTPUpdateFotoProfil, HTTPUpdateProfil } from '../../api/user'
import Header from '../../components/Header'
import { Base } from '../../layout/base'
import { AppDispatch } from '../../store'
import { RootState } from '../../store/rootReducer'
import { setAuthStatus, setReduxUsersProfile } from '../../store/user'
import Cookies from "js-cookie";
import Logo from "../../assets/images/hrlogo.png";
import Blank from "../../assets/images/blank.png";
import Image from "next/image";
import { RiAwardFill, RiCropLine, RiMailLine, RiMapPin2Line, RiMenLine, RiPencilLine, RiPhoneLine, RiQuestionLine, RiUser3Line, RiWomenLine } from 'react-icons/ri'
import { FormControl, InputLabel, Input, InputAdornment, Button, FormHelperText, MenuItem, Select } from '@material-ui/core'
import DialogMigrate from '../../components/Dialog'
import { useForm } from "react-hook-form";
import { IUserProfilValidation } from '../../types/formValidation'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import router from 'next/router'
import { Slide, toast } from 'react-toastify';
import moment from 'moment'
import next from 'next'
import { HTTPGetAllRole } from '../../api/role'

interface IDataUser {
  data: {
    fullname: string;
    address: string;
    phone: string;
    email: string;
    foto: any;
    gender: any;
    role: { 
      id: number,
      role_name: string;
      slug_role_name: string;
    }
  }
}

const ChildEditFotoProfil = (props: {
  onChange: any, 
  image: any, 
  setCropper: any, 
  getCropData:any, 
  cropData: any, 
  handleClose: any, 
  disableBtnCancel: any, 
  httpUpdateFotoProfil: any, 
  disableBtnSubmit: any,
}) => {
  return(
    <div className="mb-2 mt-6">
      <div>
        <input type="file" accept="image/*" onChange={props.onChange} />
      </div>

      <Cropper
        zoomTo={0.5}
        initialAspectRatio={1}
        className="overflow-hidden my-2 h-52 w-full"
        src={props.image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={(instance) => {
          props.setCropper(instance);
        }}
        guides={true}
      />

      <Button size="small" onClick={props.getCropData} color="primary" variant="contained"
        className={`absolute ${props.image === '' ? 'hide_btn_crop' : 'show_btn_crop'}`}
        style={{borderRadius: '0px 0px 10px 10px', bottom: '8px', padding: '8px'}}
        fullWidth
      >
        <RiCropLine size="20px" className="mr-1"/> Crop
      </Button>

      {
        props.cropData !== '' ?
        <div className=" w-3/6 mt-2">
          <div>Preview</div>
          <img className="h-full w-full object-cover" src={props.cropData} alt="cropped" />
        </div>
        : <div></div>
      }

      <div className="flex justify-end">
        <div className="mr-2">
          <Button 
            size="small" 
            onClick={props.handleClose} 
            color="secondary" 
            variant="outlined"
            disabled={props.disableBtnCancel}
          >
            Batal
          </Button>
        </div>
        <div>
          <Button 
            size="small" 
            onClick={props.httpUpdateFotoProfil} 
            color="primary" 
            variant="contained"
            disabled={props.disableBtnSubmit}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}

const ChildEditProfil = (props: {
  handleSubmit: any, 
  errors: any, 
  register: any,
  handleClose: any,
  value: IDataUser,
  listRole: any,
  openRole: any,
  handleCloseRole: any,
  handleOpenRole: any,
  handleChangeRole: any
  openGender: any,
  handleCloseGender: any,
  handleOpenGender: any,
  handleChangeGender: any
}) => {
  return(
    <div className="mb-2 mt-6">
      <form 
        onSubmit={props.handleSubmit}
        autoComplete="on"
        className=""
      >
        <div className="mb-4">
          <FormControl error={props.errors.fullname ? true : false} className="w-full">
            <InputLabel htmlFor="standard-adornment-fullname">
              Nama Lengkap
            </InputLabel>
            <Input 
              placeholder="Masukan email"
              // className="w-56"
              defaultValue={props.value.data.fullname}
              {...props.register("fullname", { 
                required: 'wajib diisi',
              })}
              startAdornment={
                <InputAdornment position="start">
                  <RiUser3Line color="#000" size="20"/>
                </InputAdornment>
              }
            />
            <FormHelperText>{props.errors.fullname && props.errors.fullname.message}</FormHelperText>
          </FormControl>
        </div>

        <div className="mb-4">
          <FormControl error={props.errors.address ? true : false} className="w-full">
            <InputLabel htmlFor="standard-adornment-address">
              Alamat Lengkap
            </InputLabel>
            <Input 
              placeholder="Masukan email"
              // className="w-56"
              defaultValue={props.value.data.address}
              {...props.register("address", { 
                required: 'wajib diisi',
              })}
              startAdornment={
                <InputAdornment position="start">
                  <RiMapPin2Line color="#000" size="20"/>
                </InputAdornment>
              }
            />
            <FormHelperText>{props.errors.address && props.errors.address.message}</FormHelperText>
          </FormControl>
        </div>

        <div className="mb-4">
          <FormControl error={props.errors.phone ? true : false} className="w-full">
            <InputLabel htmlFor="standard-adornment-phone">
              Nomor Telepon
            </InputLabel>
            <Input 
              placeholder="Masukan email"
              // className="w-56"
              defaultValue={props.value.data.phone}
              {...props.register("phone", { 
                required: 'wajib diisi',
              })}
              startAdornment={
                <InputAdornment position="start">
                  <RiPhoneLine color="#000" size="20"/>
                </InputAdornment>
              }
            />
            <FormHelperText>{props.errors.phone && props.errors.phone.message}</FormHelperText>
          </FormControl>
        </div>

        <div className="mb-10">
          <FormControl error={props.errors.gender ? true : false} className="w-full">
            <InputLabel id="demo-controlled-open-select-gender">Jenis Kelamin</InputLabel>
            <Select
              labelId="demo-controlled-open-select-gender"
              id="demo-controlled-open-select"
              open={props.openGender}
              onClose={props.handleCloseGender}
              onOpen={props.handleOpenGender}
              onChange={props.handleChangeGender}
              placeholder="Jenis Kelamin"
              defaultValue={props.value.data.gender === null ? '' : props.value.data.gender}
              {...props.register("gender", { 
                required: 'wajib diisi',
              })}
              startAdornment={
                <InputAdornment position="start">
                  <RiMenLine color="#000" size="20"/>
                </InputAdornment>
              }
            >
              <MenuItem value="" disabled>Jenis Kelamin</MenuItem>
              <MenuItem value="L">Laki-Laki</MenuItem>
              <MenuItem value="P">Perempuan</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="flex justify-end">
          <div className="mr-2">
            <Button 
              size="small" 
              onClick={props.handleClose} 
              color="secondary" 
              variant="outlined"
            >
              Batal
            </Button>
          </div>
          <div>
            <Button 
              size="small" 
              color="primary" 
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

const Profil = ({data}: IDataUser) => {
  toast.configure()
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()

  const myAvatar = process.env.PHOTO_URL+(userRedux.profile.foto as any)+'?'+moment()
  
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [disableBtnSubmit, setDisableBtnSubmit] = React.useState(true);
  const [disableBtnCancel, setDisableBtnCancel] = React.useState(false);

  const [openEditFoto, setOpenEditFoto] = useState(false);
  const [openEditProfil, setOpenEditProfil] = useState(false);

  const [dataUser, setdataUser] = useState<IDataUser>({
    data: {
      address: '',
      email: '',
      foto: '',
      fullname: '',
      gender: '',
      phone: '',
      role: {
        id: 0,
        role_name: '',
        slug_role_name: ''
      }
    }
  })

  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();

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
      setDisableBtnSubmit(false)
    }
  };

  React.useEffect(() => {
    return () => {
      myAvatar
    }
  }, [myAvatar])

  React.useEffect(() => {
    setdataUser({
      data: {
        fullname: data.fullname,
        address: data.address,
        phone: data.phone,
        email: data.email,
        foto: data.foto,
        gender: data.gender,
        role: {
          id: data.role.id,
          role_name: data.role.role_name,
          slug_role_name: data.role.slug_role_name,
        },
      }
    })

    return () => {
      data
    }
  }, [data])

  useEffect(() => {
    httpGetAllRole()
    return()=>{
      setlistRole([])
    }
  }, [])

  // role
  const [listRole, setlistRole] = useState([])
  const [selectRole, setselectRole] = React.useState(0);
  const [openRole, setOpenRole] = React.useState(false);

  const handleChangeRole = (event: any) => {
    setselectRole(event.target.value);
  };

  const handleCloseRole = () => {
    setOpenRole(false);
  };

  const handleOpenRole = () => {
    setOpenRole(true);
  };

  // gender
  const [gender, setGender] = React.useState('');
  const [openGender, setOpenGender] = React.useState(false);

  const handleChangeGender = (event: any) => {
    setGender(event.target.value);
  };

  const handleCloseGender = () => {
    setOpenGender(false);
  };

  const handleOpenGender = () => {
    setOpenGender(true);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 handle form                                */
  /* -------------------------------------------------------------------------- */
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IUserProfilValidation>();
  const onSubmits = (data: any) => {
    // httpUpdateProfil()
    // console.log('nyangkut update profil')
    // console.log(data)
    
    httpUpdateProfil(data)
  };

  const lengthObject = Object.keys(errors)
  // console.log(errors)
  
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
    setImage('')
    setCropData('')
    setDisableBtnSubmit(true)
  };

  const parseError = (error: any) => {
    const errors = JSON.parse(JSON.stringify(error))
    return errors;
  }

  const httpGetAllRole  = async () => {
    try {
      const response = await HTTPGetAllRole();
      setlistRole(response.data.data)
      // console.log(response)
    } catch (error) {
      const errors = parseError(error)
      console.log(errors)
      setLoadingSubmit(false)
    }
  }

  const httpUpdateFotoProfil = async () => {
    setLoadingSubmit(true)
    setDisableBtnSubmit(true)
    setDisableBtnCancel(true)

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

          setdataUser({
            data: {
              fullname: responseProfil.data.data.fullname,
              address: responseProfil.data.data.address,
              phone: responseProfil.data.data.phone,
              email: responseProfil.data.data.email,
              foto: responseProfil.data.data.foto,
              gender: responseProfil.data.data.gender,
              role: {
                id: responseProfil.data.data.role.id,
                role_name: responseProfil.data.data.role.role_name,
                slug_role_name: responseProfil.data.data.role.slug_role_name,
              },
            }
          })

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
          setDisableBtnCancel(false)
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
          setDisableBtnCancel(false)
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
      setDisableBtnCancel(false)
      handleClose()
      setImage('')
    }
  }

  const httpUpdateProfil = async (data: any) => {
    setLoadingSubmit(true)
    setDisableBtnSubmit(true)
    setDisableBtnCancel(true)

    try {
      const response = await HTTPUpdateProfil({
        token: userRedux.token,
        fullname: data.fullname,
        address: data.address,
        phone: data.phone,
        gender: data.gender,
      })

      setLoadingSubmit(false)
      setDisableBtnSubmit(false)
      setDisableBtnCancel(false)

      dispatch(setReduxUsersProfile({
        fullname: data.fullname,
        address: data.address,
        phone: data.phone,
        gender: data.gender,
        email: userRedux.profile.email,
        role_name: userRedux.profile.role_name,
        slug_role_name: userRedux.profile.slug_role_name,
        foto: userRedux.profile.foto
      }))
      handleClose()
      
    } catch (error) {
      const errors = JSON.parse(JSON.stringify(error))
      console.log(errors)
      
      setLoadingSubmit(false)
      setDisableBtnSubmit(false)
      setDisableBtnCancel(false)
      handleClose()

      toast('gagal update profil', {
        position: "bottom-right",
        autoClose: 5000,
        type: 'success',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })
    }
  }
  
  /* -------------------------------------------------------------------------- */
  /*                                 show page                                  */
  /* -------------------------------------------------------------------------- */
  return (
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
                  userRedux.profile.foto ?
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
                    src={Blank}
                    width="90" 
                    height="90"
                    layout="intrinsic"
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
                <div className="fullname text-lg text-white font-bold">{userRedux.profile.fullname}</div>
                <div className="rolename bg-red-500 px-2 rounded-md text-white">
                  {userRedux.profile.role_name}
                </div>
              </div>
            </div>

            <div className="detailuser w-full mt-6 mb-6">
              <div className="email flex flex-col text-sm justify-center items-center">
                <div className="bg-red-50 p-2 rounded-full">
                  <RiMailLine color="red" size="20px"/>
                </div>
                <div className="text-center">
                  {userRedux.profile.email}
                </div>
              </div>
              <div className="phone flex flex-col text-sm justify-center items-center">
                <div className="bg-green-50 p-2 rounded-full">
                  <RiPhoneLine color="green" size="20px"/>
                </div>
                <div className="text-center">
                  {userRedux.profile.phone}
                </div>
              </div>
              <div className="address flex flex-col text-sm justify-center items-center">
                <div className="bg-blue-50 p-2 rounded-full">
                  <RiMapPin2Line color="blue" size="20px"/>
                </div>
                <div className="text-center">
                  {userRedux.profile.address}
                </div>
              </div>
              <div className="gender flex flex-col text-sm justify-center items-center">
                <div className="bg-yellow-50 p-2 rounded-full">
                  { userRedux.profile.gender === null ? <RiQuestionLine color="orange" size="20px"/> : 
                    userRedux.profile.gender === 'P' ? <RiWomenLine color="orange" size="20px"/> :
                    <RiMenLine color="orange" size="20px"/>
                  }
                </div>
                {userRedux.profile.gender === null ? 'unknown' : userRedux.profile.gender === 'P' ? 'Perempuan' : 'Pria'}
              </div>
            </div>
          </div>
        </div>
        
        {/* dialog update profil */}
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

            { openEditFoto ? 
              <ChildEditFotoProfil 
                cropData={cropData} 
                getCropData={getCropData} 
                image={image} 
                onChange={onChange} 
                setCropper={setCropper}
                disableBtnCancel={disableBtnCancel}
                disableBtnSubmit={disableBtnSubmit}
                handleClose={handleClose}
                httpUpdateFotoProfil={httpUpdateFotoProfil}
              /> : 
              <ChildEditProfil 
                handleSubmit={handleSubmit(onSubmits)} 
                errors={errors} 
                register={register}
                handleClose={handleClose}
                value={dataUser}
                listRole={listRole}
                handleChangeRole={handleChangeRole}
                handleCloseRole={handleCloseRole}
                handleOpenRole={handleOpenRole}
                openRole={openRole}
                handleChangeGender={handleChangeGender}
                handleCloseGender={handleCloseGender}
                handleOpenGender={handleOpenGender}
                openGender={openGender}
              /> 
            }
          </div>
        </DialogMigrate>
      </div>
    </Base>
  )
}

export default Profil

export async function getServerSideProps(context: any) {
  try {
    if (context.req.headers.cookie === undefined) {
      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    } else {
      let replaceToken = ''
      const a = JSON.parse(JSON.stringify(context.req.headers.cookie))
      let splitt = a.split(" ");

      // console.log('token ada = ',splitt)

      for (var j = 0; j < splitt.length; j++) {
        if (splitt[j].match('token')) {
          console.log('token ada = ', splitt[j])
          const replaceToken2 = splitt[j].replace('token=','');
          replaceToken = replaceToken2;
        }
      }
      const response = await HTTPGetProfil({ token: replaceToken})
      console.log(response.data)
      const data = response.data.data
      return {
        props: {
          data: data
        },
      }
    }
  } catch (error) {
    return {
      props: {
        data: error
      },
    }
  }
}
