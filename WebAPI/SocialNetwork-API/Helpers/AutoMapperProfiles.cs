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


            //CreateMap<PostDto, Post>()
            //        .ForMember(dest => dest.ImgId, opt =>
            //        {
            //            opt.MapFrom(src => new ObjectId(src.ImgId));
            //        }).ForMember(dest => dest.Comments, opt =>
            //       {
            //           opt.MapFrom(src => src.Comments);

            //       }).ForMember(dest => dest.UserId, opt =>
            //        {
            //            opt.MapFrom(src => new ObjectId(src.UserId));
            //        });


            CreateMap<Post, PostDto>()
               .ForMember(dest => dest.ImgId, opt =>
               {
                   opt.MapFrom(src => src.ImgId.ToString());
               })
               .ForMember(dest => dest.Comments, opt =>
               {
                   opt.MapFrom(src => src.Comments);

               }).ForMember(dest => dest.UserId, opt =>
               {
                   opt.MapFrom(src => src.UserId);
               }).ForMember(obj => obj.Likes,
                exp => exp.MapFrom<PostDetailUsernameResolver>())
                .ForMember(obj => obj.LikeCount,
                exp => exp.MapFrom<LikeCountResolver>())
                .ForMember(obj => obj.CommentCount,
                exp => exp.MapFrom<CommentCountResolver>())
                .ForMember(obj => obj.Comments,
                exp => exp.MapFrom<ListCommentsResolver>())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));



            //CreateMap<Post, PostDetailsDto>()
            //  .ForMember(dest => dest.ImgId, opt =>
            //  {
            //      opt.MapFrom(src => src.ImgId);
            //  }).ForMember(dest => dest.Comments, opt =>
            //  {
            //      opt.MapFrom(src => src.Comments);

            //  }).ForMember(dest => dest.UserId, opt =>
            //  {
            //      opt.MapFrom(src => src.UserId);
            //  });

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
               }).ForMember(dest => dest.Id, opt =>
               {
                   opt.MapFrom(src => new ObjectId(src.Id));
               }).ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Comment, CommentDto>()
              .ForMember(dest => dest.PostId, opt =>
              {
                  opt.MapFrom(src => src.PostId.ToString());
              }).ForMember(dest => dest.UserId, opt =>
              {
                  opt.MapFrom(src => src.UserId.ToString());
              }).ForMember(dest => dest.Username, opt =>
              {
                  opt.MapFrom<CommentDtoUsernameResolver>();
              }).ForMember(dest => dest.SharedTime, opt =>
              {
                  opt.MapFrom(src => src.SharedTime);
              }).ForMember(dest => dest.Id, opt =>
              {
                  opt.MapFrom(src => src.Id.ToString());
              }).ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<Post, PostDetailsDto>()
                  .ForMember(dest => dest.Id, opt =>
                  {
                      opt.MapFrom(src => src.Id.ToString());
                  }).ForMember(dest => dest.Username, opt =>
                  {
                      opt.MapFrom(src => src.Username);
                  }).ForMember(dest => dest.Likes, opt => opt.MapFrom<PostDetailLikeResolver>()).ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            //.ForMember(dest => dest.Comments, opt =>
            // {
            //     opt.MapFrom<ListCommentsResolver>();

            // })

            //CreateMap<Like, LikeDto>()
            //     .ForMember(dest => dest.Id, opt =>
            //     {
            //         opt.MapFrom(src => src.Id.ToString());
            //     })
            //   .ForMember(obj => obj.Username,
            //   exp => exp.MapFrom<UsernameResolverLikeDto>()).ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            //CreateMap<Like, LikeDto>()

            // .ForMember(obj => obj.Username,
            //     exp => exp.MapFrom<UsernameResolverLikeDto>()).ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));


            CreateMap<Like, LikeDto>()
               .ForMember(dest => dest.Id, opt =>
               {
                   opt.MapFrom(src => src.Id);
               }).ForMember(obj => obj.Username,
                exp => exp.MapFrom<UsernameResolverLikeDto>());

        }


    }
}
