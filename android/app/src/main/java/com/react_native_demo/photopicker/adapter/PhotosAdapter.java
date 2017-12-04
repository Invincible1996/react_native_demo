package com.react_native_demo.photopicker.adapter;

import android.content.Context;
import android.database.Cursor;
import android.support.v4.widget.CursorAdapter;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import com.react_native_demo.R;
import com.react_native_demo.photopicker.bean.ImageBean;

/**
 * Created by wenqiang on 2017/12/1.
 */

public class PhotosAdapter extends CursorAdapter {

    public PhotosAdapter(Context context, Cursor c) {
        super(context, c);
    }

    @Override
    public View newView(Context context, Cursor cursor, ViewGroup parent) {
        View view = View.inflate(context, R.layout.item_gridview, null);
        return view;
    }

    @Override
    public void bindView(View view, Context context, Cursor cursor) {
        ImageBean musicBean = ImageBean.fromCursor(cursor);
    }

    static class ViewHolder {
        ImageView iv_image;
        ImageView iv_select;

        ViewHolder(View view) {
            iv_image= (ImageView) view.findViewById(R.id.iv_image);
            iv_select = (ImageView) view.findViewById(R.id.iv_select);
        }

        public static ViewHolder getViewHolder(View view) {
            ViewHolder viewHolder = (ViewHolder) view.getTag();
            if (viewHolder == null) {
                viewHolder = new ViewHolder(view);
                view.setTag(viewHolder);
            }
            return viewHolder;
        }
    }
}
