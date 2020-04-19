using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Helpers
{
    public class CloudinaryMethods
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinarySettings;

        private static Cloudinary _cloudinary;

        public CloudinaryMethods(IUnitOfWork uow, IMapper mapper, IOptions<CloudinarySettings> cloudinarySettings)
        {
            _uow = uow;
            _mapper = mapper;
            _cloudinarySettings = cloudinarySettings;


            Account account = new Account(
                _cloudinarySettings.Value.CloudName,
                _cloudinarySettings.Value.ApiKey,
                _cloudinarySettings.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);



        }


        public static UploadImageDto UploadImageToCloudinary(UploadImageDto uploadImageDto)
        {
            var file = uploadImageDto.File;
            var uploadresult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream)

                    };

                    uploadresult = _cloudinary.Upload(uploadParams);
                }
            }
            uploadImageDto.Url = uploadresult.Uri.ToString();
            uploadImageDto.PublicId = uploadresult.PublicId;

            return uploadImageDto;
        }

        public static RetrieveImageDto RetrieveImageFromCloudinary(RetrieveImageDto retrieveImageDto)
        {

            return retrieveImageDto;
        }

    }
}
