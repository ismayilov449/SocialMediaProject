using AutoMapper;
using SocialNetwork_API.Dtos;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Helpers
{
    public class AutoMapperProfiles : Profile
    {

        public AutoMapperProfiles()
        {
            //CreateMap<Post, PostDto>()
            //    .ForMember(dest => dest.ImgUrl, opt =>
            //    {
            //        opt.MapFrom(src => src.Photo.Url);
            //    }).ForMember(dest => dest.Comments, opt =>
            //   {
            //       opt.MapFrom(src => src.Comments == null ? new List<Comment>() : src.Comments);

            //   }).ForMember(dest => dest.Username, opt =>
            //    {
            //        opt.MapFrom(src => src.User.Username);
            //    });

            //CreateMap<Post, PostDetailsDto>()
            //    .ForMember(dest => dest.ImgUrl, opt =>
            //    {
            //        opt.MapFrom(src => src.Photo.Url);
            //    }).ForMember(dest => dest.Comments, opt =>
            //    {
            //        opt.MapFrom(src => src.Comments == null ? new List<Comment>() : src.Comments);

            //    }).ForMember(dest => dest.Username, opt =>
            //    {
            //        opt.MapFrom(src => src.User.Username);
            //    }).ForMember(dest => dest.UserImgUrl, opt =>
            //    {
            //        opt.MapFrom(src => src.User.ImgUrl);
            //    });




        }
         

    }
}
