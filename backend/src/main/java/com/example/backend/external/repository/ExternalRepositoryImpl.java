package com.example.backend.external.repository;

import com.example.backend.external.dto.ExternalIntroResponseDto;
import com.example.backend.external.dto.ExternalPageResponseDto;

import com.example.backend.external.entity.External;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.backend.external.entity.QExternal.external;

@RequiredArgsConstructor
public class ExternalRepositoryImpl implements ExternalRepositoryCustom{


    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ExternalPageResponseDto> searchAll(Pageable pageable) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long specificMemberId = Long.parseLong(authentication.getName());

        List<External> contents = queryFactory
                .selectFrom(external)
//                .where(external.manager.id.eq(specificMemberId))
                .orderBy(external.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<ExternalPageResponseDto> pages = contents
                .stream()
                .map(ExternalPageResponseDto::of)
                .collect(Collectors.toList());

        int totalSize = queryFactory
                .selectFrom(external)
//                .where(external.manager.id.eq(specificMemberId))
                .fetch()
                .size();

        return new PageImpl<>(pages, pageable, totalSize);
    }

    @Override
    public List<ExternalIntroResponseDto> searchNow() {


        List<External> contents = queryFactory
                .selectFrom(external)
                .orderBy(external.externalStartdate.desc())
                .limit(4)
                .fetch();

        List<ExternalIntroResponseDto> externals = contents
                .stream()
                .map(ExternalIntroResponseDto::of)
                .collect(Collectors.toList());


        return externals;
    }

}

