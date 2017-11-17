package com.react_native_demo.photopicker.adapter;

import android.content.Context;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.PagerAdapter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.react_native_demo.R;

import java.util.List;

import uk.co.senab.photoview.PhotoView;

/**
 * Created by wenqiang on 2017/11/17.
 */

public class BigImageAdapter extends PagerAdapter {


    private List<String> mList;

    private Context mContext;


    public BigImageAdapter(List<String> list, Context context) {
        mList = list;
        mContext = context;
    }

    @Override
    public int getCount() {
        return mList.size();
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == object;
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.item_viewpager, null);
        TextView mTv_count = (TextView) view.findViewById(R.id.tv_count);
        PhotoView mPhotoView = (PhotoView) view.findViewById(R.id.photoview);
        mTv_count.setText(position + 1 + "/" + mList.size());
        Glide.with(mContext).load(mList.get(position)).into(mPhotoView);
        container.addView(view);
        return view;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((View) object);
    }
}
