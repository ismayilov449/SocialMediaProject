using AutoMapper;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.DAL.Concrete.MongoDB;
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


            CreateMap<PostDto, Post>()
                    .ForMember(dest => dest.ImgId, opt =>
                    {
                        opt.MapFrom(src => new ObjectId(src.ImgId));
                    }).ForMember(dest => dest.Comments, opt =>
                   {
                       opt.MapFrom(src => src.Comments);

                   }).ForMember(dest => dest.UserId, opt =>
                    {
                        opt.MapFrom(src => new ObjectId(src.UserId));
                    });


            CreateMap<Post, PostDto>()
               .ForMember(dest => dest.ImgId, opt =>
               {
                   opt.MapFrom(src => src.ImgId);
               }).ForMember(dest => dest.Comments, opt =>
               {
                   opt.MapFrom(src => src.Comments);

               }).ForMember(dest => dest.UserId, opt =>
               {
                   opt.MapFrom(src => src.UserId);
               });

            CreateMap<CommentDto, Comment>()
                .ForMember(dest => dest.PostId, opt =>
                {
                    opt.MapFrom(src => new ObjectId(src.PostId));
                }).ForMember(dest => dest.UserId, opt =>
                {
                    opt.MapFrom(src => new ObjectId(src.UserId));
                }).ForMember(dest => dest.SharedTime, opt =>
               {
                   opt.MapFrom(src => DateTime.UtcNow);
               });

            //CreateMap<Post, PostDetailsDto>()
            //    .ForMember(dest => dest.Id, opt =>
            //   {
            //       opt.MapFrom(src => src.Id.ToString());

            //   });

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
