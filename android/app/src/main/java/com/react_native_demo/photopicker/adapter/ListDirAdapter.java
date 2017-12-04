package com.react_native_demo.photopicker.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.react_native_demo.R;
import com.react_native_demo.photopicker.bean.ImgFolderBean;

import java.util.List;

/**
 * Created by wenqiang on 2017/11/28.
 */

public class ListDirAdapter extends BaseAdapter {
    private LayoutInflater mInflater;
    private List<ImgFolderBean> mDatas;
    private boolean isSelect = false;

    public ListDirAdapter(Context context, List<ImgFolderBean> datas) {

        mInflater = LayoutInflater.from(context);
        mDatas = datas;

    }

    @Override
    public int getCount() {
        return mDatas.size();
    }

    @Override
    public Object getItem(int position) {
        return mDatas.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @NonNull
    @Override
    public View getView(int positon, @Nullable View convertView, @NonNull ViewGroup parent) {

        ViewHolder holder = null;

        if (convertView == null) {

            holder = new ViewHolder();
            convertView = mInflater.inflate(R.layout.item_popup_main, parent, false);
            holder.mImg = (ImageView) convertView.findViewById(R.id.iv_dir);
            holder.mTv_dir_name = (TextView) convertView.findViewById(R.id.id_dir_item_name);
            holder.mTv_dir_count = (TextView) convertView.findViewById(R.id.id_dir_item_count);
            holder.mIv_select_dir = (ImageView) convertView.findViewById(R.id.iv_select_dir);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }


        ImgFolderBean bean = mDatas.get(positon);

        holder.mImg.setImageResource(R.mipmap.pictures_no);

        Glide.with(parent.getContext()).load(bean.getFistImgPath()).into(holder.mImg);
        holder.mTv_dir_name.setText(bean.getName());
        holder.mTv_dir_count.setText(bean.getCount() + "");

        if (isSelect) {
            holder.mIv_select_dir.setVisibility(View.VISIBLE);
        } else {
            holder.mIv_select_dir.setVisibility(View.GONE);
        }

        return convertView;
    }

    private class ViewHolder {
        ImageView mImg;
        ImageView mIv_select_dir;
        TextView mTv_dir_name;
        TextView mTv_dir_count;

    }
}

